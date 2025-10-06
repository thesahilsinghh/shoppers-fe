import React from 'react'
import ProductModal from './ProductModal';

const ProductCard = ({ product, setSelectProductId, setModalOpen}) => {

  function handleProductModal(id){
    setSelectProductId(id);
    setModalOpen(true);
  }


  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer" onClick={() => handleProductModal(product._id)}>
      <figure className="h-48 flex items-center justify-center overflow-hidden bg-gray-50">
        {product.image ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={product.image} alt={`Image of ${product.title}`} className="object-contain h-full" />
        ) : (
          <div className="text-sm text-gray-400">No image</div>
        )}
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-sm md:text-md">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-semibold">₹{product.price}</span>
          <span className="text-xs text-gray-400">{product.category}</span>
        </div>
      </div>
    </div>
  );
}
export default ProductCard