import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Statistic from "./components/Statistic";

export default function App() {
  let itemListInit = [
    { id: 1, quantity: 2, description: "test", packed: false },
    { id: 3, quantity: 3, description: "passport", packed: true },
    { id: 2, quantity: 1, description: "tooth brush", packed: true },
  ];
  const [itemList, setItemList] = useState(itemListInit);
  function handleAddItems(item) {
    setItemList((prevList) => [...prevList, item]);
  }
  function handleDelItems(itemId) {
    setItemList((prevList) => prevList.filter((item) => item.id !== itemId));
  }
  function handlePackedItems(itemId) {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setItemList(() => []);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        itemList={itemList}
        onClearList={handleClearList}
        onDelItems={handleDelItems}
        onPacked={handlePackedItems}
      />
      <Statistic itemList={itemList} />
    </div>
  );
}
