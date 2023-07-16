import { useState } from "react";

function App() {
  const DUMMY_DATA = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    {
      category: "Fruits",
      price: "$2",
      stocked: false,
      name: "Passionfruit",
    },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    {
      category: "Vegetables",
      price: "$4",
      stocked: false,
      name: "Pumpkin",
    },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  ];

  const [searchterm, setSearch] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div className="App">
      <h1>Searchable products table</h1>
      <p>This is searhable products table, built in React</p>
      <SearchForm
        searchTerm={searchterm}
        inStockOnly={inStockOnly}
        setSearch={setSearch}
        setInStockOnly={setInStockOnly}
      />
      <p></p>
      <ProductsTable
        products={DUMMY_DATA}
        filteredText={searchterm}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchForm({ searchTerm, inStockOnly, setSearch, setInStockOnly }) {
  return (
    <form action="GET">
      <div className="form-group">
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="filter">In Stock items Only</label>
        <input
          type="checkbox"
          id="filter"
          checked={inStockOnly}
          onChange={(e) => {
            setInStockOnly(e.target.checked);
          }}
        />
      </div>
    </form>
  );
}

function ProductsTable({ products, filteredText, inStockOnly }) {
  let productsJSX = [];
  products.forEach((product) => {
    if (inStockOnly && !product.stocked) {
      console.log("Only stocked selected ");
      return;
    }
    if( ! product.name.toLowerCase().includes(filteredText.toLowerCase().trim()) ){
      return;
    }
    productsJSX.push(<Product product={product} key={product.name} />);
  });

  return (
    <div className="products">
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Name</th>
            <th style={{ textAlign: "left" }}>Price</th>
          </tr>
        </thead>
        <tbody>{productsJSX}</tbody>
      </table>
    </div>
  );
}

function Product({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default App;
