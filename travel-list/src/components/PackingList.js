import { useState } from "react";
import Item from "./Item"

export default function PackingList({
  itemList,
  onClearList,
  onDelItems,
  onPacked,
}) {
  const [sortBy, setSortBy] = useState("input");
  let newItemList;
  if (sortBy === "description") {
    newItemList = itemList.slice().sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  } else if (sortBy === "packed") {
    newItemList = itemList.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed);
    });
    console.log("newList: ", newItemList);
  } else {
    newItemList = itemList;
  }
  return (
    <div className="list">
      <ul>
        {newItemList.map((item) => (
          <Item item={item} onDelItems={onDelItems} onPacked={onPacked} />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(() => e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear all</button>
      </div>
    </div>
  );
}
