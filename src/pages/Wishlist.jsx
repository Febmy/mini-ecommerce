import { useContext } from 'react'
import { WishlistContext } from '../context/WishlistContext'
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext)

  if (wishlist.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Wishlist Kosong</h1>
        <Link to="/catalog" className="text-blue-600 underline">
          Cari produk favoritmu
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="border p-4 rounded shadow">
            <img
              src={`/assets/images/${item.image}`}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-blue-600 font-bold">Rp{item.price.toLocaleString()}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist