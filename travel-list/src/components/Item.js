export default function Item({ item, onDelItems, onPacked }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPacked(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        className="button"
        onClick={() => {
          onDelItems(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
