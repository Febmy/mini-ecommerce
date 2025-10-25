import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser } from "../api/reqres";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "orders", label: "Orders" },
  { key: "wishlist", label: "Wishlist" },
  { key: "activity", label: "Activity" },
];

export default function UserDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await getUser(id);
        if (alive) setUser(res?.data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const seed = Number(id || 1);
  const orders = useMemo(() => makeOrders(seed), [seed]);
  const wishlist = useMemo(() => makeWishlist(seed), [seed]);
  const rating = useMemo(() => (3.9 + (seed % 10) / 10).toFixed(1), [seed]);

  const copyEmail = async () => {
    if (!user?.email) return;
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  if (loading) {
    return (
      <section className="relative">
        <AuroraBG />
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-3xl">
            <div className="h-6 w-40 rounded-xl bg-gray-200 animate-pulse mb-6"></div>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-5 w-56 rounded bg-gray-200 animate-pulse"></div>
                <div className="h-4 w-72 max-w-full rounded bg-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 rounded-2xl bg-gray-100 animate-pulse"></div>
              ))}
            </div>
            <div className="mt-6 h-9 w-28 rounded-xl bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="container mx-auto px-4 py-10">
        <p className="text-red-600">User tidak ditemukan.</p>
        <button onClick={() => nav(-1)} className="mt-4 px-4 py-2 rounded-2xl border">
          Kembali
        </button>
      </section>
    );
  }

  return (
    <section className="relative">
      <AuroraBG />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <button onClick={() => nav(-1)} className="underline underline-offset-2 hover:text-gray-700">
            Users
          </button>{" "}
          / <span className="text-gray-700">{user.first_name} {user.last_name}</span>
        </nav>

        <div className="max-w-4xl">
          {/* Header profile */}
          <div className="flex items-center gap-4">
            {/* Blue-themed ring */}
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-[hsl(197,100%)] via-[hsl(210,100%)] to-[hsl(270,100%)]">
              <img
                src={user.avatar}
                alt={user.first_name}
                className="h-20 w-20 rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {user.first_name} {user.last_name}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-gray-600">
                <a href={`mailto:${user.email}`} className="hover:underline truncate">
                  {user.email}
                </a>
                <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active
                </span>
                <button
                  onClick={copyEmail}
                  className="ml-1 text-xs px-2 py-1 rounded-lg border hover:bg-gray-50"
                  title="Salin email"
                >
                  Copy
                </button>
                {copied && <span className="text-xs text-emerald-600">Copied!</span>}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button onClick={() => nav(-1)} className="px-4 py-2 rounded-2xl border hover:bg-gray-50">
              Kembali
            </button>
            <a
              href={`mailto:${user.email}?subject=Hello%20${encodeURIComponent(user.first_name)}`}
              className="px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Kirim Email
            </a>
            <button
              onClick={() => window.open(`https://www.gravatar.com/${user.id}`, "_blank")}
              className="px-4 py-2 rounded-2xl border hover:bg-gray-50"
            >
              Lihat Avatar Source
            </button>
          </div>

          {/* Mini stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard label="Pesanan" value={orders.length} />
            <StatCard label="Wishlist" value={wishlist.length} />
            <StatCard label="Rating" value={`${rating}★`} />
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="overflow-x-auto">
              <div className="inline-flex gap-2 rounded-2xl border bg-white/70 backdrop-blur p-1">
                {TABS.map(t => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
                      ${tab === t.key ? "bg-blue-600 text-white shadow" : "hover:bg-gray-50"}`}
                    aria-current={tab === t.key ? "page" : undefined}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border bg-white/70 backdrop-blur p-4 sm:p-5">
              {tab === "overview" && <OverviewTab user={user} orders={orders} wishlist={wishlist} />}
              {tab === "orders" && <OrdersTab orders={orders} />}
              {tab === "wishlist" && <WishlistTab items={wishlist} />}
              {tab === "activity" && <ActivityTab />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Sub Components ===== */

function OverviewTab({ user, orders, wishlist }) {
  return (
    <div className="space-y-5">
      <div className="text-sm text-gray-600">
        Pengguna <span className="font-medium">{user.first_name} {user.last_name}</span> terdaftar di MiniShop.
        Email diverifikasi. Statistik cepat terlihat di atas.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4">
          <h4 className="font-semibold mb-2">Pesanan Terbaru</h4>
          <ul className="text-sm space-y-2">
            {orders.slice(0,3).map(o => (
              <li key={o.id} className="flex items-center justify-between">
                <span className="truncate">#{o.code}</span>
                <span className="text-gray-600">{formatIDR(o.total)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border p-4">
          <h4 className="font-semibold mb-2">Wishlist</h4>
          <ul className="text-sm space-y-2">
            {wishlist.slice(0,4).map(w => (
              <li key={w.id} className="flex items-center justify-between">
                <span className="truncate">{w.name}</span>
                <span className="text-gray-600">{formatIDR(w.price)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function OrdersTab({ orders }) {
  return (
    <div className="space-y-3">
      {orders.map(o => (
        <div key={o.id} className="rounded-2xl border p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium">#{o.code} — {o.date}</div>
            <div className="text-sm text-gray-600">{o.items} item · {formatIDR(o.total)}</div>
          </div>
          <span className={`text-xs rounded-full px-2 py-1 border ${o.status === "Paid" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : o.status === "Shipped" ? "bg-sky-50 border-sky-200 text-sky-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
            {o.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function WishlistTab({ items }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map(it => (
        <li key={it.id} className="rounded-2xl border p-3 bg-white hover:shadow-sm transition">
          <div className="aspect-square rounded-xl overflow-hidden mb-2">
            <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-sm font-medium truncate">{it.name}</div>
          <div className="text-xs text-gray-600">{formatIDR(it.price)}</div>
        </li>
      ))}
    </ul>
  );
}

function ActivityTab() {
  return (
    <ul className="space-y-3 text-sm">
      <TimelineItem title="Login berhasil" time="2 jam lalu" />
      <TimelineItem title="Menambahkan item ke wishlist" time="Kemarin" />
      <TimelineItem title="Checkout pesanan #INV-10" time="3 hari lalu" />
      <TimelineItem title="Ulas produk 'Sneakers Air'" time="5 hari lalu" />
    </ul>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 hover:shadow-sm transition">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function TimelineItem({ title, time }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600"></span>
      <div className="min-w-0">
        <div className="font-medium">{title}</div>
        <div className="text-gray-500">{time}</div>
      </div>
    </li>
  );
}

function AuroraBG() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-10%] -translate-x-1/2 h-56 w-[40rem] rounded-full bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 blur-3xl opacity-30"></div>
      <div className="absolute right-[-10%] bottom-[-10%] h-48 w-[28rem] rounded-full bg-gradient-to-tr from-blue-200 via-cyan-200 to-indigo-200 blur-3xl opacity-25"></div>
    </div>
  );
}

/* ===== Helpers & Fake Data ===== */

function pad(n) { return n.toString().padStart(2, "0"); }
function formatIDR(n) { return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n); }

function makeOrders(seed) {
  const count = 3 + (seed % 4); // 3..6 orders
  const arr = [];
  for (let i = 0; i < count; i++) {
    const id = seed * 100 + i + 1;
    const total = 150000 + ((seed + i) % 9) * 75000;
    const items = 1 + ((seed + i) % 4);
    const d = new Date();
    d.setDate(d.getDate() - (i * 3 + (seed % 2)));
    const date = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
    const status = (i + seed) % 3 === 0 ? "Paid" : (i + seed) % 3 === 1 ? "Shipped" : "Pending";
    arr.push({ id, code: `INV-${id}`, date, total, items, status });
  }
  return arr;
}

function makeWishlist(seed) {
  const count = 4 + (seed % 3); // 4..6 items
  const arr = [];
  for (let i = 0; i < count; i++) {
    const id = seed * 10 + i + 1;
    const price = 250000 + ((seed + i) % 6) * 50000;
    const name = `Produk Favorit #${i + 1}`;
    const image = `https://picsum.photos/seed/wish-${seed}-${i}/600/600`;
    arr.push({ id, name, price, image });
  }
  return arr;
}


