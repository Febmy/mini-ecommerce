import { useState, useEffect } from "react";

export default function useOrders(key = "orders") {
  const [orders, setOrders] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(orders));
  }, [key, orders]);

  return [orders, setOrders];
}
