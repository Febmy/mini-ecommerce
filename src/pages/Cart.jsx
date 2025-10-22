import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Keranjang Kosong</h1>
        <Link to="/catalog" className="text-blue-600 underline">
          Belanja sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={`/assets/images/${item.image}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">Rp{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-blue-600 font-bold mb-2">
                Rp{(item.price * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: Rp{totalPrice.toLocaleString()}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Kosongkan
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
