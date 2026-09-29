import { useEffect, useState } from "react";
import api from "../api/api";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";

function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      getProducts();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-500 mb-8">Manage your products</p>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Add Product
          </h2>

          <AddProduct onProductAdded={getProducts} />
        </div>

        {editingProduct && (
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">
              Edit Product
            </h2>

            <EditProduct
              product={editingProduct}
              onProductUpdated={() => {
                getProducts();
                setEditingProduct(null);
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h2>

              <p className="text-gray-500 mb-4">{product.description}</p>

              <div className="flex justify-between items-center mb-5">
                <p className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </p>

                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
              </div>

              <button
                onClick={() => setEditingProduct(product)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Edit Product
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="w-full mt-2 bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Delete Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
