import { IProduct } from "../types";

const Product = (product: IProduct) => {
  const { title, description, brand, price, category, thumbnail } = product;
  return (
    <div style={{ display: "grid" }}>
      <h2>{title}</h2>
      <img src={thumbnail} alt="Product" />
      <span>Description: {description}</span>
      <span>Brand: {brand}</span>
      <span>Price: {price}</span>
      <span>Category: {category}</span>
    </div>
  );
};

export default Product;
