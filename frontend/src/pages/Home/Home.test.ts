import { filterProducts } from "./utils";

describe("Home util functions", () => {
  describe("filterProducts", () => {
    const mockProducts = [
      {
        id: 1,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        brand: "Apple",
        price: 549,
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      },
      {
        id: 2,
        title: "iPhone X",
        description:
          "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        brand: "Apple",
        price: 899,
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      },
      {
        id: 30,
        title: "Key Holder",
        description:
          "Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
        brand: "Golden",
        price: 30,
        category: "home-decoration",
        thumbnail: "https://i.dummyjson.com/data/products/30/thumbnail.jpg",
      },
      {
        id: 5,
        title: "Mac M2",
        description: "An apple computer",
        brand: "Apple",
        price: 999,
        category: "laptop",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      },
    ];

    it("should return all products when no filters are selected", () => {
      const result = filterProducts("", "", mockProducts);

      expect(result).toEqual(mockProducts);
    });

    it("should return matching products when brand filter is selected", () => {
      const result = filterProducts("Apple", "", mockProducts);

      expect(result).toEqual(
        mockProducts.filter((product) => product["brand"] === "Apple")
      );
    });
    it("should return matching products when category filter is selected", () => {
      const result = filterProducts("", "home-decoration", mockProducts);

      expect(result).toEqual(
        mockProducts.filter(
          (product) => product["category"] === "home-decoration"
        )
      );
    });

    it("should return matching products when both filters are selected", () => {
      const result = filterProducts("Apple", "laptop", mockProducts);

      expect(result).toEqual(
        mockProducts.filter(
          (product) =>
            product["brand"] === "Apple" && product["category"] == "laptop"
        )
      );
    });
  });
});
