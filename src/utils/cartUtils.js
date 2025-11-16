// Utility sederhana untuk logika e-commerce di mini project-mu

export function calculateSubtotal(items = []) {
  if (!Array.isArray(items)) {
    throw new Error("items must be an array");
  }

  return items.reduce((total, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const quantity =
      typeof item.quantity === "number" && item.quantity > 0
        ? item.quantity
        : 1;

    return total + price * quantity;
  }, 0);
}

export function calculateDiscount(subtotal, discount) {
  if (!discount || typeof subtotal !== "number" || subtotal <= 0) {
    return 0;
  }

  const minSubtotal =
    typeof discount.minimumSubtotal === "number" ? discount.minimumSubtotal : 0;

  if (subtotal < minSubtotal) {
    return 0;
  }

  if (discount.type === "percentage") {
    const value = typeof discount.value === "number" ? discount.value : 0;
    if (value <= 0) return 0;
    return (subtotal * value) / 100;
  }

  if (discount.type === "flat") {
    const value = typeof discount.value === "number" ? discount.value : 0;
    if (value <= 0) return 0;
    // flat discount tidak boleh lebih besar dari subtotal
    return value > subtotal ? subtotal : value;
  }

  // tipe discount yang tidak dikenal
  return 0;
}

export function calculateTax(amount, taxRate) {
  if (typeof amount !== "number" || amount <= 0) return 0;
  if (typeof taxRate !== "number" || taxRate <= 0) return 0;

  return (amount * taxRate) / 100;
}

export function calculateGrandTotal(items, discount, taxRate) {
  const subtotal = calculateSubtotal(items);
  const discountAmount = calculateDiscount(subtotal, discount);
  const beforeTax = subtotal - discountAmount;
  const tax = calculateTax(beforeTax, taxRate);

  return {
    subtotal,
    discount: discountAmount,
    tax,
    total: beforeTax + tax,
  };
}

export function filterProducts(products = [], query = "", sortBy = "name-asc") {
  if (!Array.isArray(products)) return [];

  const normalizedQuery = query.trim().toLowerCase();

  let filtered = products;

  if (normalizedQuery) {
    filtered = filtered.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const brand = (product.brand || "").toLowerCase();
      return name.includes(normalizedQuery) || brand.includes(normalizedQuery);
    });
  }

  const sorters = {
    "price-asc": (a, b) => (a.price ?? 0) - (b.price ?? 0),
    "price-desc": (a, b) => (b.price ?? 0) - (a.price ?? 0),
    "name-desc": (a, b) => (b.name || "").localeCompare(a.name || ""),
    "name-asc": (a, b) => (a.name || "").localeCompare(b.name || ""),
  };

  const sorter = sorters[sortBy] || sorters["name-asc"];

  return [...filtered].sort(sorter);
}
