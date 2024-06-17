export default function Statistic({ itemList }) {
  if (itemList.length === 0) {
    return <footer className="stats">Start adding your items</footer>;
  }
  let packedNo = itemList.reduce((accu, cur) => {
    console.log("cur.packed: ");
    console.log(cur.packed);
    accu = Number(cur.packed) + Number(accu);
    return accu;
  }, 0);
  let percent = (packedNo / itemList.length) * 100;
  percent = percent.toFixed(2);

  return (
    <footer className="stats">
      <em>
        You have {itemList.length} items on your list, and you already packed{" "}
        {percent}%
      </em>
    </footer>
  );
}
