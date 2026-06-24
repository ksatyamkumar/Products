import { useEffect, useState } from "react";
import API from "./services/api";
import ProductList from "./components/ProductList";

function App() {
  const [category, setCategory] = useState("");

  const [products, setProducts] = useState([]);

  const [nextCursor, setNextCursor] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async (isLoadMore = false) => {
    try {
      setLoading(true);

      let url = "/products";

      const params = [];

      // Category Filter
      if (category) {
        params.push(`category=${category}`);
      }
      //     if (category) {
      //   url += `?category=${category}`;
      // }

      // Cursor Pagination
      if (isLoadMore && nextCursor) {
        params.push(
          `cursorUpdatedAt=${encodeURIComponent(nextCursor.updatedAt)}`,
        );

        params.push(`cursorId=${nextCursor.id}`);
      }

      // Build Query String
      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const { data } = await API.get(url);

      if (isLoadMore) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      } else {
        setProducts(data.products);
      }

      setNextCursor(data.nextCursor);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setNextCursor(null);

    fetchProducts();
  }, [category]);

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "rgb(0, 0, 0)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white"
        }}
      >
        Product Browser
      </h1>

      <select
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>

        <option value="Books">Books</option>

        <option value="Electronics">Electronics</option>

        <option value="Fashion">Fashion</option>

        <option value="Sports">Sports</option>

        <option value="Toys">Toys</option>
      </select>

      <ProductList products={products} />

      {nextCursor && (
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={() => fetchProducts(true)}
        >
          Load More
        </button>
      )}

      {loading && <h3>Loading Products...</h3>}

      {!loading && products.length === 0 && <h3>No Products Found</h3>}

      <p>
        Total Loaded:
        {products.length}
      </p>
    </div>
  );
}

export default App;

// outside package.lock.json
// {
//   "name": "Product",
//   "lockfileVersion": 3,
//   "requires": true,
//   "packages": {}
// }

