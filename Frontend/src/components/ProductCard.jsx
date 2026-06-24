function ProductCard({ product }) {
  return (
    <div
      style={{
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
  }}
    >
      <h3>{product.name}</h3>

<p>
  Category:
  {product.category}
</p>

<p>
  ₹{product.price}
</p>

<p>
  Updated:
  {new Date(
    product.updatedAt
  ).toLocaleString()}
</p>
    </div>
  );
}

export default ProductCard;