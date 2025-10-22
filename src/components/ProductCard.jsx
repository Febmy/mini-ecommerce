import { Link } from "react-router-dom";
import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="border rounded shadow hover:shadow-lg transition p-4 relative">
      <button
        onClick={toggleWishlist}
        className={`absolute top-2 right-2 border rounded-full p-2 ${
          isInWishlist ? "bg-red-500 text-white" : "bg-white hover:bg-gray-100"
        }`}
        title={isInWishlist ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
      >
        ❤️
      </button>
      <Link to={`/product/${product.id}`}>
        <img
          src={`/assets/images/${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-blue-600 font-bold mt-2">
          Rp{product.price.toLocaleString()}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
