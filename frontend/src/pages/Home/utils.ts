import { IProduct } from "../../types";

export const filterProducts = (
  selectedBrand: string,
  selectedCategory: string,
  products: IProduct[]
) => {
  let filteredProducts: IProduct[] = [...products];
  if (selectedBrand !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === selectedBrand
    );
  }
  if (selectedCategory !== "") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }
  return filteredProducts;
};
