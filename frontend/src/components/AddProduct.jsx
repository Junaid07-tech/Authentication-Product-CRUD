import { useForm } from "react-hook-form";
import api from "../api/api";
function AddProduct({ onProductAdded }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/products", data);

      console.log(response.data);
      onProductAdded();
      reset();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Product name" {...register("name")} />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
        />

        <input type="number" placeholder="Price" {...register("price")} />

        <input type="text" placeholder="Category" {...register("category")} />

        <input type="number" placeholder="Stock" {...register("stock")} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
