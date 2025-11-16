import {
  calculateSubtotal,
  calculateDiscount,
  calculateTax,
  calculateGrandTotal,
  filterProducts,
} from "./cartUtils";

describe("cartUtils helpers", () => {
  describe("calculateSubtotal", () => {
    it("throws when items is not an array", () => {
      expect(() => calculateSubtotal(null)).toThrow("items must be an array");
    });

    it("calculates subtotal with default quantity and ignores invalid price", () => {
      const items = [
        { id: 1, price: 100_000, quantity: 2 },
        { id: 2, price: 50_000 }, // quantity default 1
        { id: 3, price: "not-a-number", quantity: 3 }, // diabaikan
      ];

      const subtotal = calculateSubtotal(items);
      expect(subtotal).toBe(250_000);
    });
  });

  describe("calculateDiscount", () => {
    it("returns 0 when discount object is missing or subtotal invalid", () => {
      expect(calculateDiscount(100_000, null)).toBe(0);
      expect(calculateDiscount(-10, { type: "percentage", value: 10 })).toBe(0);
    });

    it("returns 0 when subtotal is below minimumSubtotal", () => {
      const discount = {
        type: "percentage",
        value: 10,
        minimumSubtotal: 500_000,
      };
      expect(calculateDiscount(200_000, discount)).toBe(0);
    });

    it("calculates percentage discount correctly", () => {
      const discount = { type: "percentage", value: 10 };
      expect(calculateDiscount(200_000, discount)).toBe(20_000);
    });

    it("handles invalid percentage discount value", () => {
      const discount = { type: "percentage", value: 0 };
      expect(calculateDiscount(200_000, discount)).toBe(0);
    });

    it("calculates flat discount and caps at subtotal", () => {
      const flat = { type: "flat", value: 50_000 };
      const capped = { type: "flat", value: 500_000 };

      expect(calculateDiscount(200_000, flat)).toBe(50_000);
      expect(calculateDiscount(200_000, capped)).toBe(200_000);
    });

    it("handles invalid flat discount value", () => {
      const discount = { type: "flat", value: 0 };
      expect(calculateDiscount(200_000, discount)).toBe(0);
    });

    it("returns 0 for unsupported discount type", () => {
      const weird = { type: "voucher", value: 50_000 };
      expect(calculateDiscount(200_000, weird)).toBe(0);
    });
  });

  describe("calculateTax", () => {
    it("returns 0 when amount or taxRate is invalid", () => {
      expect(calculateTax(-100_000, 10)).toBe(0);
      expect(calculateTax(100_000, 0)).toBe(0);
    });

    it("calculates tax correctly when inputs are valid", () => {
      expect(calculateTax(100_000, 11)).toBe(11_000);
    });
  });

  describe("calculateGrandTotal", () => {
    it("combines subtotal, discount, and tax into a summary object", () => {
      const items = [
        { id: 1, price: 100_000, quantity: 1 },
        { id: 2, price: 50_000, quantity: 2 },
      ];
      const discount = { type: "percentage", value: 10 }; // 10% dari 200_000 = 20_000
      const taxRate = 11; // 11% dari 180_000 = 19_800

      const summary = calculateGrandTotal(items, discount, taxRate);

      expect(summary.subtotal).toBe(200_000);
      expect(summary.discount).toBe(20_000);
      expect(summary.tax).toBe(19_800);
      expect(summary.total).toBe(199_800);
    });

    it("handles empty items and missing discount / tax", () => {
      const summary = calculateGrandTotal([], null, 0);
      expect(summary).toEqual({
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
      });
    });
  });

  describe("filterProducts", () => {
    const products = [
      { id: 1, name: "Runner X", brand: "Infinity", price: 800_000 },
      { id: 2, name: "City Walk", brand: "Infinity", price: 550_000 },
      { id: 3, name: "Street Flex", brand: "Urban", price: 650_000 },
    ];

    it("returns empty array when products is not an array", () => {
      expect(filterProducts(null)).toEqual([]);
    });

    it("filters by search query matching name or brand", () => {
      const byName = filterProducts(products, "runner");
      const byBrand = filterProducts(products, "urban");

      expect(byName.map((p) => p.id)).toEqual([1]);
      expect(byBrand.map((p) => p.id)).toEqual([3]);
    });

    it("sorts by price ascending and descending", () => {
      const asc = filterProducts(products, "", "price-asc");
      const desc = filterProducts(products, "", "price-desc");

      expect(asc.map((p) => p.price)).toEqual([550_000, 650_000, 800_000]);
      expect(desc.map((p) => p.price)).toEqual([800_000, 650_000, 550_000]);
    });

    it("sorts by name descending and uses name ascending as default", () => {
      const desc = filterProducts(products, "", "name-desc");
      const def = filterProducts(products, "", "unknown-sort");

      expect(desc.map((p) => p.name)).toEqual([
        "Street Flex",
        "Runner X",
        "City Walk",
      ]);
      expect(def.map((p) => p.name)).toEqual([
        "City Walk",
        "Runner X",
        "Street Flex",
      ]);
    });

    it("applies both filter and sort together", () => {
      const result = filterProducts(products, "infinity", "price-desc");
      expect(result.map((p) => p.name)).toEqual(["Runner X", "City Walk"]);
    });
  });
});
