import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/src/data/products.json")
      .then((res) => {
        const found = res.data.find((p) => p.id === parseInt(id));
        setProduct(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={`/assets/images/${product.image}`}
          alt={product.name}
          className="w-full h-80 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-blue-600 text-xl font-semibold mb-6">
            Rp{product.price.toLocaleString()}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
