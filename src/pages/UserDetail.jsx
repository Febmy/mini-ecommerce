import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal memuat data user");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">
        {user.first_name} {user.last_name}
      </h1>
      <p className="text-gray-600 mb-2">{user.email}</p>
      <p className="text-sm text-gray-500">User ID: {user.id}</p>
    </div>
  );
};

export default UserDetail;
