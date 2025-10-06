import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Search, Filter, Copy, ChevronUp, ChevronDown, Eye, EyeOff, Edit } from 'lucide-react';
import { GET_PRODUCTS_QUERY } from '../grapghql/queries/user.queries';


interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  publish: boolean;
  description?: string;
  image?: string;
}

interface FilterProducts {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "date";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

interface ProductTableProps {
  onEditProduct?: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ onEditProduct }) => {
  const [filters, setFilters] = useState<FilterProducts>({
    sortBy: 'date',
    sortOrder: 'desc',
    limit: 10,
    page: 1
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_QUERY, {
    variables: { filters },
    fetchPolicy: 'cache-and-network'
  });

  const categories = {
    ELECTRONICS: "Electronic",
    FASHION: "Fashion",
    HOME_KITCHEN: "Home & Kitchen",
    BOOKS: "Books",
    HEALTH_BEAUTY: "Health & Beauty",
  };

  const products: Product[] = data?.allProducts || [];

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterChange = (key: keyof FilterProducts, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'date',
      sortOrder: 'desc',
      limit: 10,
      page: 1
    });
    setSearchTerm('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const togglePublish = (productId: string) => {

    console.log('Toggle publish for:', productId);
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          Error loading products: {error.message}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products List</h2>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading...' : `${filteredProducts.length} products found`}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {Object.entries(categories).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <Input
                type="number"
                placeholder="Min price"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <Input
                type="number"
                placeholder="Max price"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={filters.sortBy || 'date'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as "price" | "date")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort Order
              </label>
              <select
                value={filters.sortOrder || 'desc'}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as "asc" | "desc")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Items per page
              </label>
              <select
                value={filters.limit || 10}
                onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs">
                        {product._id.substring(0, 8)}...
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(product._id)}
                        className="p-1 h-6 w-6"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <div className="max-w-xs truncate" title={product.title}>
                      {product.title}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 border-b">
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.quantity > 10 
                        ? 'bg-green-100 text-green-800'
                        : product.quantity > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border-b">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.publish
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.publish ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border-b">
                    <div className="flex items-center gap-2">
                      {onEditProduct && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditProduct(product)}
                          className="p-1 h-7 w-7"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && filteredProducts.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!filters.page || filters.page <= 1}
              onClick={() => handleFilterChange('page', (filters.page || 1) - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFilterChange('page', (filters.page || 1) + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};