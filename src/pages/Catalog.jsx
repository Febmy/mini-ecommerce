import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Catalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/data/products.json")
      .then((res) => {
        // cek apakah res.data array atau object
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (res.data.products) {
          setProducts(res.data.products);
        } else {
          setProducts([]); // fallback
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Katalog Produk</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
