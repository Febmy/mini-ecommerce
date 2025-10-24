import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listUsers } from "../api/reqres.js";

export default function Users() {
  const [page, setPage] = useState(1);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let on = true;
    setLoading(true);
    setErr("");
    listUsers(page)
      .then((d) => on && setRes(d))
      .catch(
        (e) =>
          on && setErr(e?.message || e?.response?.data?.error || "Gagal memuat")
      )
      .finally(() => on && setLoading(false));
    return () => {
      on = false;
    };
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!res) return null;

  const { data, page: current, total_pages } = res;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users (Reqres)</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((u) => (
          <li
            key={u.id}
            className="border rounded-2xl bg-white p-4 flex items-center gap-4"
          >
            <img
              src={u.avatar}
              alt={u.first_name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">
                {u.first_name} {u.last_name}
              </p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </div>
            <Link
              to={`/users/${u.id}`}
              className="px-3 py-1.5 rounded-2xl border text-sm"
            >
              Detail
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <button
          disabled={current <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1.5 rounded-2xl border disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {current} / {total_pages}
        </span>
        <button
          disabled={current >= total_pages}
          onClick={() => setPage((p) => Math.min(total_pages, p + 1))}
          className="px-3 py-1.5 rounded-2xl border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
