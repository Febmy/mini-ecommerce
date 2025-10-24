import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../api/reqres.js";

export default function UserDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let on = true;
    setLoading(true);
    setErr(null);
    getUser(id)
      .then((d) => {
        if (on) setData(d);
      }) 
      .catch((e) => {
        const msg = e?.response?.data?.error || e?.message || "Gagal memuat";
        if (on) setErr(msg);
      })
      .finally(() => {
        if (on) setLoading(false);
      });
    return () => {
      on = false;
    };
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!data) return null;

  const u = data.data;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={u.avatar}
          alt={u.first_name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {u.first_name} {u.last_name}
          </h2>
          <p className="text-gray-600">{u.email}</p>
        </div>
      </div>
      <Link to="/users" className="px-4 py-2 rounded-2xl border w-fit">
        Kembali
      </Link>
    </div>
  );
}
