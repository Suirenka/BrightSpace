import React, { use, useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState<
    {
      price: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  function renderItems() {
    return items.map((item, i) => {
      return (
        <div key={i}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      );
    });
  }

  return (
    <>
      Hello World!!!
      {renderItems()}
    </>
  );
}

export default App;
