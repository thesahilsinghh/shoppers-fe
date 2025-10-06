import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import ProductCard from '../../components/product/ProductCard';
import SideFilters from '../../components/product/SideFilters';
import ProductModal from '../../components/product/ProductModal';

// ----------------------
// GraphQL: placeholder query
// Replace `Product` fields with your backend fields
// Expects variables: category, minPrice, maxPrice, sortBy, sortOrder, limit, offset
// ----------------------
const GET_PRODUCTS = gql`
    query AllProducts($filters: FilterProducts) {
    allProducts(filters: $filters) {
      _id
      category
      description
      image
      price
      publish
      quantity
      title
    }
  }
`;

function parseNumberParam(value) {
    if (!value) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
}
export default function ProductPage() {
    const [searchParams, setSearchParams] = useSearchParams();


    const categoryParam = searchParams.get('category') || undefined;
    const minPriceParam = parseNumberParam(searchParams.get('minPrice'));
    const maxPriceParam = parseNumberParam(searchParams.get('maxPrice'));
    const sortByParam = searchParams.get('sortBy') || 'createdAt';
    const sortOrderParam = searchParams.get('sortOrder') || 'desc';
    const pageParam = parseNumberParam(searchParams.get('page')) || 1;
    const limit = 12;

    // Local filter state mirrors URL params
    const [filters, setFilters] = useState({
        category: categoryParam,
        sortBy: sortByParam,
        sortOrder: sortOrderParam,
        page: pageParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
    });
    const [sortBy, setSortBy] = useState(sortByParam);
    const [sortOrder, setSortOrder] = useState(sortOrderParam);
    const [page, setPage] = useState(pageParam);

    const [selectedProductId, setSelectProductId] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Health & Beauty'];

    const loaderRef = useRef(null);

    // Keep local state synced when URL changes (back/forward)
    useEffect(() => {
        setFilters(prev => (
            { ...prev, category: categoryParam?.toUpperCase(), minPrice: minPriceParam, maxPrice: maxPriceParam, sortBy: sortByParam, sortOrder: sortOrderParam, page: pageParam }
        ));
        setSortBy(sortByParam);
        setSortOrder(sortOrderParam);
        setPage(pageParam);
        
    }, [categoryParam, minPriceParam, maxPriceParam, sortByParam, sortOrderParam, pageParam]);

    // Update URL when filters/sort/page change
    function updateUrl(next: any) {
        const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));

        // set/remove keys
        if (next.category) params.set('category', next.category);
        else params.delete('category');

        if (next.minPrice !== undefined && next.minPrice !== null) params.set('minPrice', String(next.minPrice));
        else params.delete('minPrice');

        if (next.maxPrice !== undefined && next.maxPrice !== null) params.set('maxPrice', String(next.maxPrice));
        else params.delete('maxPrice');

        params.set('sortBy', next.sortBy);
        params.set('sortOrder', next.sortOrder);
        params.set('page', String(next.page ?? 1));

        setSearchParams(params, { replace: true });
    }

    useEffect(() => {
        updateUrl({ ...filters, sortBy, sortOrder, page });
    }, [filters, sortBy, sortOrder, page]);

    const { data, loading, error, refetch, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: {
            filters
        }
    });

    // const items = data?.allProducts ?? [];

    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (data?.allProducts) {
            if (page === 1) setItems(data.allProducts);
            else setItems((prev) => [...prev,...data.allProducts]);
            if (data?.allProducts?.length < limit){
                console.log(data.allProducts.length)
                 setHasMore(false);
            }
        }
    }, [data])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && !loading && hasMore) {
                    
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: '200px', threshold: 0 }
        );

        const current = loaderRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, [loading, hasMore]);

    // Basic pagination handlers
    const total = data?.products?.total ?? 2;

    const pageCount = Math.max(1, Math.ceil(total / limit));

    function handleResetAll() {
        setFilters({ category: undefined, minPrice: undefined, maxPrice: undefined });
        setSortBy('createdAt');
        setSortOrder('desc');
        setPage(1);
        setHasMore(true);

    }

    // Responsive layout: use DaisyUI drawer for mobile
    return (
        <div className="drawer drawer-mobile">
            <input id="products-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-4">
                {/* Top bar: toggle drawer on mobile + title + sort dropdown */}
                <div className="flex items-center justify-between mb-4 ">
                    <div className="flex items-center gap-3 ">
                        <label htmlFor="products-drawer" className="btn btn-ghost ">Filters</label>
                        <h2 className="text-xl font-semibold">Products</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="form-control">
                            <select
                                className="select select-bordered select-sm"
                                value={`${sortBy}:${sortOrder}`}
                                onChange={(e) => {
                                    const [by, order] = e.target.value.split(':');
                                    setSortBy(by);
                                    setSortOrder(order);
                                    setPage(1);
                                }}
                            >
                                <option value="price:asc">Price: Low → High</option>
                                <option value="price:desc">Price: High → Low</option>
                                <option value="createdAt:desc">Newest</option>
                                <option value="createdAt:asc">Oldest</option>
                            </select>
                        </div>
                        <button className="btn btn-outline btn-sm" onClick={() => handleResetAll()}>Refresh</button>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: limit }).map((_, i) => (
                            <div key={i} className="h-56 animate-pulse bg-gray-100 rounded"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="alert alert-error">Error loading products</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((p) => (
                            <ProductCard key={p._id} product={p} setSelectProductId={setSelectProductId} setModalOpen={setModalOpen} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {/* <div className="flex items-center justify-between mt-6">
                    <div>
                        <span className="text-sm text-gray-500">Page {1} of {2}</span>
                    </div>
                    <div className="btn-group">
                        <button className="btn btn-sm" disabled={page <= 1} onClick={() => setPage((s) => Math.max(1, s - 1))}>Prev</button>
                        <button className="btn btn-sm" disabled={page >= pageCount} onClick={() => setPage((s) => Math.min(pageCount, s + 1))}>Next</button>
                    </div>
                </div> */}
                <div ref={loaderRef} className="text-center py-4">
                    {loading && <span className="loading loading-spinner" />}
                </div>
            </div>

            <ProductModal
                productId={selectedProductId}
                open={modalOpen}
                setOpen={setModalOpen}

            />

            <div className="drawer-side">
                <label htmlFor="products-drawer" className="drawer-overlay"></label>
                <aside className="w-80 bg-base-200 border-l hidden md:block">
                    <SideFilters
                        categories={categories}
                        values={filters}
                        onChange={(vals) => { setFilters(vals); setPage(1); }}
                        onReset={handleResetAll}
                    />
                </aside>

                {/* Mobile drawer content (same filters) */}
                <aside className="w-80 bg-base-200 md:hidden">
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-medium">Filters</h4>
                            <label htmlFor="products-drawer" className="btn btn-ghost btn-sm">Close</label>
                        </div>
                        <SideFilters
                            categories={categories}
                            values={filters}
                            onChange={(vals) => { setFilters(vals); setPage(1); }}
                            onReset={handleResetAll}
                        />
                    </div>
                </aside>
            </div>
        </div>
    );
}
