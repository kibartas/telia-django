import { useEffect, useState } from "react";
import { IProduct } from "../../types";
import FilterSelect from "../../components/FilterSelect";
import Product from "../../components/Product";
import Spinner from "../../spinner.svg";
import { useNavigate } from "react-router";
import { filterProducts } from "./utils";

interface IData {
  products: IProduct[];
  uniqueBrands: string[];
  uniqueCategories: string[];
}

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [brands, setBrands] = useState<string[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[] | null>(
    null
  );

  useEffect(() => {
    if (products === null) return;
    const filteredProducts = filterProducts(
      selectedBrand,
      selectedCategory,
      products
    );
    setFilteredProducts(filteredProducts);
  }, [selectedBrand, selectedCategory, products]);

  useEffect(() => {
    fetch("http://localhost:8000/products/")
      .then((res) => res.json())
      .then((data: IData) => {
        setProducts(data.products);
        console.log(data.products);
        setBrands(data.uniqueBrands);
        setCategories(data.uniqueCategories);
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  return !filteredProducts || !brands || !categories ? (
    <img src={Spinner} alt="Loading spinner" />
  ) : (
    <div style={{ margin: "10px" }}>
      <FilterSelect
        label="Filter by brand"
        options={brands}
        onSelect={setSelectedBrand}
      />
      <FilterSelect
        label="Filter by category"
        options={categories}
        onSelect={setSelectedCategory}
      />
      {filteredProducts.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </div>
  );
};

export default Home;
