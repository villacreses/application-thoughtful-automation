const sort = require("./sort");

describe("Package Sorting Function", () => {
  describe("STANDARD stack - packages that are not bulky or heavy", () => {
    test("should return STANDARD for small light package", () => {
      expect(sort(10, 10, 10, 5)).toBe("STANDARD");
    });

    test("should return STANDARD for medium package below all thresholds", () => {
      expect(sort(50, 50, 50, 15)).toBe("STANDARD");
    });

    test("should return STANDARD for package at edge of limits", () => {
      expect(sort(149, 149, 149, 19)).toBe("STANDARD");
    });

    test("should return STANDARD for very small package", () => {
      expect(sort(1, 1, 1, 1)).toBe("STANDARD");
    });
  });

  describe("SPECIAL stack - packages that are bulky OR heavy (but not both)", () => {
    // Heavy but not bulky
    test("should return SPECIAL for heavy but not bulky package", () => {
      expect(sort(50, 50, 50, 20)).toBe("SPECIAL");
    });

    test("should return SPECIAL for very heavy light package", () => {
      expect(sort(10, 10, 10, 30)).toBe("SPECIAL");
    });

    // Bulky due to volume but not heavy
    test("should return SPECIAL for bulky by volume but not heavy", () => {
      expect(sort(100, 100, 100, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for exactly 1,000,000 cm³ volume", () => {
      expect(sort(100, 100, 100, 5)).toBe("SPECIAL");
    });

    // Bulky due to dimension but not heavy
    test("should return SPECIAL for bulky by dimension (width >= 150)", () => {
      expect(sort(150, 10, 10, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for bulky by dimension (height >= 150)", () => {
      expect(sort(10, 150, 10, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for bulky by dimension (length >= 150)", () => {
      expect(sort(10, 10, 150, 5)).toBe("SPECIAL");
    });

    test("should return SPECIAL for very large package but light", () => {
      expect(sort(200, 200, 200, 5)).toBe("SPECIAL");
    });
  });

  describe("REJECTED stack - packages that are both bulky AND heavy", () => {
    test("should return REJECTED for both heavy and bulky by volume", () => {
      expect(sort(100, 100, 100, 20)).toBe("REJECTED");
    });

    test("should return REJECTED for both heavy and bulky by dimension", () => {
      expect(sort(150, 50, 50, 20)).toBe("REJECTED");
    });

    test("should return REJECTED for large heavy package", () => {
      expect(sort(200, 200, 200, 30)).toBe("REJECTED");
    });

    test("should return REJECTED at exact thresholds", () => {
      expect(sort(150, 100, 100, 20)).toBe("REJECTED");
    });
  });

  describe("Edge cases and boundary conditions", () => {
    test("should handle zero dimensions", () => {
      expect(sort(0, 100, 100, 5)).toBe("STANDARD");
    });

    test("should handle zero mass", () => {
      expect(sort(50, 50, 50, 0)).toBe("STANDARD");
    });

    test("should handle floating point dimensions", () => {
      expect(sort(50.5, 50.5, 50.5, 10)).toBe("STANDARD");
    });

    test("should handle floating point mass", () => {
      expect(sort(50, 50, 50, 19.9)).toBe("STANDARD");
    });

    test("should handle floating point mass at heavy threshold", () => {
      expect(sort(50, 50, 50, 20.1)).toBe("SPECIAL");
    });

    test("should handle very large numbers", () => {
      expect(sort(1000, 1000, 1000, 100)).toBe("REJECTED");
    });
  });

  describe("Error handling", () => {
    test("should throw error for non-numeric width", () => {
      expect(() => sort("50", 50, 50, 10)).toThrow("All parameters must be numbers");
    });

    test("should throw error for non-numeric height", () => {
      expect(() => sort(50, "50", 50, 10)).toThrow("All parameters must be numbers");
    });

    test("should throw error for non-numeric length", () => {
      expect(() => sort(50, 50, "50", 10)).toThrow("All parameters must be numbers");
    });

    test("should throw error for non-numeric mass", () => {
      expect(() => sort(50, 50, 50, "10")).toThrow("All parameters must be numbers");
    });

    test("should throw error for negative width", () => {
      expect(() => sort(-50, 50, 50, 10)).toThrow("All dimensions and mass must be non-negative");
    });

    test("should throw error for negative height", () => {
      expect(() => sort(50, -50, 50, 10)).toThrow("All dimensions and mass must be non-negative");
    });

    test("should throw error for negative length", () => {
      expect(() => sort(50, 50, -50, 10)).toThrow("All dimensions and mass must be non-negative");
    });

    test("should throw error for negative mass", () => {
      expect(() => sort(50, 50, 50, -10)).toThrow("All dimensions and mass must be non-negative");
    });
  });
});
