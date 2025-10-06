import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Settings, Plus, Edit, Trash2, Menu, X } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useMutation } from '@apollo/client/react';
import { CreateProduct, DeleteProduct, UpdateProductDetails, UpdateProductPublishing, UpdateProductQuantity } from '../grapghql/mutations/product.detes.mutation';
import { Sidebar } from '../components/Siderbar';
import { ProductTable } from '../components/ProductsT';
import DashboardLayout from '../components/DashboardLayout';

export const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'products' | 'create' | 'update' | 'update-quantity' | 'update-publishing' | 'delete'>('products');

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    publish: false,
    quantity: 0,
    category: 'ELECTRONICS'
  });
  const [updateForm, setUpdateForm] = useState({
    id: '',
    title: '',
    description: '',
    price: 0,
    image: '',
    publish: false,
    quantity: 0,
    category: 'ELECTRONICS'
  });
  const [deleteId, setDeleteId] = useState('');
  const [createProductMutation, { loading: creating }] = useMutation(CreateProduct);
  const [UpdateProductMutation, { loading: updating }] = useMutation(UpdateProductDetails);
  const [UpdateProductMutationQ, { loading: updatingQ }] = useMutation(UpdateProductQuantity);
  const [UpdateProductMutationP, { loading: updatingP }] = useMutation(UpdateProductPublishing);
  const [deleteProductMutation, { loading: deleting }] = useMutation(DeleteProduct);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      console.log('✅ User logged out, redirecting to login...');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: any) {
      console.error('Logout error:', error.message);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const { data } = await createProductMutation({
        variables: { product: productForm },
      });
  
      toast.success('Product created successfully!');
      setProductForm({
        title: '',
        description: '',
        price: 0,
        image: '',
        publish: false,
        quantity: 0,
        category: 'ELECTRONICS',
      });
  
      console.log('Created product:', data);
  
    } catch (error: any) {
      console.error('Create product error:', error);
      toast.error('Failed to create product');
    }
  };
  
  const handleUpdateProduct = async () => {
    try {
        console.log(updateForm);
        const { data } = await UpdateProductMutation({
            variables: {
              id: updateForm.id,
              update: {
                title: updateForm.title,
                description: updateForm.description,
                price: Number(updateForm.price),
                image: updateForm.image,
                publish: updateForm.publish,
                quantity: Number(updateForm.quantity),
                category: updateForm.category,
              },
            },
          });

        toast.success('Product updated successfully!');
        setUpdateForm({
            id: '',
            title: '',
            description: '',
            price: 0,
            image: '',
            publish: false,
            quantity: 0,
            category: 'ELECTRONICS'
        });
  
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleUpdateProductQuantity = async () => {
    try {
        console.log(updateForm);
        const { data } = await UpdateProductMutationQ({
            variables: {
              id:updateForm.id,
              amount:updateForm.quantity,
              isDes: updateForm.publish,
            },
          });
          
        toast.success('Product quantity updated successfully!');
        console.log(data);
        setUpdateForm({
            id: '',
            title: '',
            description: '',
            price: 0,
            image: '',
            publish: false,
            quantity: 0,
            category: 'ELECTRONICS'
        });
    } catch (error) {
      toast.error('Failed to update product quantity');
    }
  };

  const handleUpdateProductP = async () => {
    try {
        console.log(updateForm);
        const { data } = await  UpdateProductMutationP({
            variables: { id: updateForm.id },
          });
          
        toast.success('Product publishing updated successfully!');
        console.log(data);
        setUpdateForm({
            id: '',
            title: '',
            description: '',
            price: 0,
            image: '',
            publish: false,
            quantity: 0,
            category: 'ELECTRONICS'
        });
    } catch (error) {
      toast.error('Failed to update product publishing');
    }
  };

  const handleDeleteProduct = async () => {
    try {
        const { data } = await deleteProductMutation({
            variables: { id: deleteId },
        });
        console.log('Deleting product:', deleteId);
        toast.success('Product deleted successfully!');
        setDeleteId('');
    } catch (error) {
        toast.error('Failed to delete product');
    }
  };

  const categories = [
    'ELECTRONICS',
    'FASHION',
    'HOME_KITCHEN',
    'BOOKS',
    'HEALTH_BEAUTY',
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'products':
        return <ProductTable onEditProduct={(product) => {
          setUpdateForm({
            id: product._id,
            title: product.title,
            description: product.description || '',
            price: product.price,
            image: product.image || '',
            publish: product.publish,
            quantity: product.quantity,
            category: product.category
          });
          setActiveSection('update');
        }} />;
      
      case 'create':
        return (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Create Product</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity *
              </label>
              <input
                type="number"
                value={productForm.quantity}
                onChange={(e) => setProductForm({ ...productForm, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={productForm.image}
                onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={productForm.publish}
                onChange={(e) => setProductForm({ ...productForm, publish: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Publish product
              </label>
            </div>
          </div>

          <Button
            onClick={handleCreateProduct}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!productForm.title || productForm.price <= 0 || productForm.quantity <= 0}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Product
          </Button>
        </Card>
        );

      case 'update':
        return (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Edit className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Update Product</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID *
              </label>
              <input
                type="text"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={updateForm.title}
                onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                value={updateForm.price}
                onChange={(e) => setUpdateForm({ ...updateForm, price: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={updateForm.quantity}
                onChange={(e) => setUpdateForm({ ...updateForm, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={updateForm.category}
                onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={updateForm.description}
                onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={updateForm.image}
                onChange={(e) => setUpdateForm({ ...updateForm, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/new-image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={updateForm.publish}
                onChange={(e) => setUpdateForm({ ...updateForm, publish: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Publish product
              </label>
            </div>
          </div>

          <Button
            onClick={handleUpdateProduct}
            className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={!updateForm.id}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Product
          </Button>
        </Card>
        );

      case 'update-quantity':
        return (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Edit className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Update Product Quantity</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID *
              </label>
              <input
                type="text"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="text"
                value={updateForm.quantity}
                onChange={(e) => setUpdateForm({ ...updateForm, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div className="flex items-center mt-5">
              <input
                type="checkbox"
                checked={updateForm.publish}
                onChange={(e) => setUpdateForm({ ...updateForm, publish: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Decrease
              </label>
            </div>
          </div>

          <Button
            onClick={handleUpdateProductQuantity}
            className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={!updateForm.id}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Product Quantity
          </Button>
        </Card>

        );

      case 'update-publishing':
        return (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Edit className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Update Product Publishing</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID *
              </label>
              <input
                type="text"
                value={updateForm.id}
                onChange={(e) => setUpdateForm({ ...updateForm, id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product ID"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={updateForm.publish}
                onChange={(e) => setUpdateForm({ ...updateForm, publish: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Publish
              </label>
            </div>
          </div>

          <Button
            onClick={handleUpdateProductP}
            className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white"
            disabled={!updateForm.id}
          >
            <Edit className="w-4 h-4 mr-2" />
            Update Product Publising
          </Button>
        </Card>
        );

      case 'delete':
        return (
          <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Delete Product</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product ID *
            </label>
            <input
              type="text"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product ID to delete"
            />
          </div>

          <Button
            onClick={handleDeleteProduct}
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white"
            disabled={!deleteId}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </Button>
        </Card>

        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout user={user}>
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-2">Manage your products efficiently</p>
      </div>

      {/* Dynamic Content */}
      {renderContent()}
    </DashboardLayout>
  );
};