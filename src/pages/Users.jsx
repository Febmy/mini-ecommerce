import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listUsers } from "../api/reqres";
import SimplePagination from "../components/SimplePagination.jsx";

export default function Users() {
  const [params, setParams] = useSearchParams();
  const initialPage = Number(params.get("page") || 1);

  const [page, setPage] = useState(initialPage);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    setParams({ page: String(page) }, { replace: true });
  }, [page, setParams]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const res = await listUsers(page);
        if (!alive) return;
        setData(res?.data || []);
        setTotalPages(res?.total_pages || 1);
      } catch (e) {
        if (!alive) return;
        setErr(e?.message || "Gagal memuat users");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [page]);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
      </div>

      {err && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
          {err}
        </div>
      )}

      {loading ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="rounded-2xl border bg-white p-4">
              <div className="h-28 w-full rounded-xl bg-gray-100 animate-pulse mb-3"></div>
              <div className="h-4 w-3/4 bg-gray-100 animate-pulse rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-100 animate-pulse rounded"></div>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data.map((u) => (
              <li key={u.id} className="rounded-2xl border bg-white p-4 hover:shadow-sm transition">
                <div className="aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={u.avatar} alt={u.first_name} className="w-full h-full object-cover" referrerPolicy="no-referrer"/>
                </div>
                <div className="font-medium">{u.first_name} {u.last_name}</div>
                <div className="text-sm text-gray-600 truncate">{u.email}</div>
                <div className="mt-3">
                  {/* NOTE: detail path in your repo is /user/:id (singular) */}
                  <Link to={`/user/${u.id}`} className="inline-block px-3 py-1.5 rounded-xl border text-sm hover:bg-gray-50">
                    Detail
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <SimplePagination
            className="mt-6"
            page={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        </>
      )}
    </section>
  );
}
