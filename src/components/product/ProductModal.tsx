import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import axios from 'axios';

const GET_PRODUCT_BY_ID = gql`
query ProductById($id:String!){
    productById(id:$id){
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
`




const ProductModal = ({ productId, open, setOpen }) => {
    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { id: productId! } ,skip: !productId,});

    // const {} = useCart()
    const product = data?.productById;


    const handleClose = () => {
        console.log(productId);
        setOpen(false);
    };

   

    const handleAddToCart = (productId:string) => {
        // if (onAddToCart) onAddToCart(productId);
        // fallback: simple console log
        // else 
        // axios.post(`${import.meta.env.VITE_API_URL}/cart`,{
        //     productId,
        //     quantity:1
        // })
        // .then(res=>console.log(res))
        // .catch(err=>console.log(err))
            console.log('Add to cart:', );
    };

    return (
        <div>
            {open && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl w-[95%]">
                        <div className="flex items-start justify-between">
                            <h3 className="font-bold text-lg">{loading ? 'Loading...' : product?.title}</h3>
                            <button className="btn btn-ghost btn-sm" onClick={handleClose}>✕</button>
                        </div>


                        {loading ? (
                            <div className="mt-4 space-y-3">
                                <div className="h-48 bg-gray-100 animate-pulse rounded"></div>
                                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4"></div>
                                <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2"></div>
                            </div>
                        ) : error ? (
                            <div className="mt-4 alert alert-error">Failed to load product</div>
                        ) : (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1 flex items-center justify-center">
                                    {product?.image ? (
                                        <img src={product.image} alt={product.title} className="max-h-64 object-contain" />
                                    ) : (
                                        <div className="h-48 w-full bg-gray-100 flex items-center justify-center">No image</div>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-500 mb-2">{product?.category}</p>
                                    <p className="text-lg font-semibold mb-2">₹{product?.price}</p>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-6">{product?.description}</p>


                                    <div className="mt-3 flex items-center gap-4">
                                        <div className="text-sm">Available: <span className="font-medium">{product?.quantity ?? '—'}</span></div>
                                        {/* <div className="text-sm">Created: <span className="text-gray-400">{product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : '—'}</span></div> */}
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="modal-action justify-between">
                            <button className="btn" onClick={handleClose}>Close</button>
                            <button className="btn btn-primary" onClick={()=>handleAddToCart(productId)} disabled={loading || !product}>Add to cart</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductModal