import "./App.css";
import {useState} from 'react';
  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];


function App() {

  const [friends, setFriends] = useState(initialFriends);
  function addFriend(newFriend){
    console.log("add New Friend: ", newFriend);
    setFriends(()=> [...friends, newFriend]);
  }
  function updateBalance(friendId, newBalance){
    setFriends(()=> friends.map((friend)=> friend.id === friendId ? {...friend, balance: newBalance } : friend))
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friendList={friends} updateBalance={updateBalance} />
        <AddFriend addFriend={addFriend} />
      </div>
      {/* <SplitBill /> */}
    </div>
  );
}

function AddFriend({addFriend}) {
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  function handleSubmit(e){
    e.preventDefault();
    let newFriend = { id: Date.now(), name: name, image: imgUrl, balance: 0 };
    console.log("new friend: ", newFriend)
    addFriend(newFriend)
    setName(()=>'')
    setImgUrl(()=>'')

  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      Friend name
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      Image URL
      <input
        type="text"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <button className="button"> Add</button>
    </form>
  );
}

function FriendList({ friendList, updateBalance }) {
  console.log("Friend List: ", friendList);
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          name={friend.name}
          balance={friend.balance}
          image={friend.image}
          id={friend.id}
          updateBalance={updateBalance}
        />
      ))}
    </ul>
  );
}

function Friend({ name, balance, image, id, updateBalance }) {
  let [selected, setSelected] = useState(false);
  let content, textColor;
  if (balance < 0) {
    content = `You owe ${name} $${balance}`;
    textColor = "red";
  } else if (balance > 0) {
    content = `${name} owes you $${balance}`;
    textColor = "green";
  } else {
    textColor = "black";
    content = `You and ${name} are even`;
  }
  return (
    <>
      <li>
        <img src={image} alt="avatar" />
        <h3>{name}</h3>
        <p className={textColor}>{content}</p>
        <button className="button" onClick={() => setSelected(() => !selected)}>
          {selected ? <>Close</> : <> Selecte </> } 
        </button>
      </li>

      <div className="sidebar">
        {selected && (
          <SplitBill name={name} id={id} updateBalance={updateBalance} />
        )}
      </div>
    </>
  );
}

function SplitBill({ name, id, updateBalance }) {
  const [billValue, setBillValue] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("You");
  const [isYouPay, setIsYouPay] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    if (payer === "You"){
      updateBalance(id, Number(billValue) - Number(yourExpense));
    }
    else updateBalance(id, - Number(billValue) + Number(yourExpense));
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      Bill value
      <input
        type="text"
        value={billValue}
        onChange={(e) => setBillValue(() => e.target.value)}
      />

      Your expense
      <input
        type="text"
        value={yourExpense}
        onChange={(e) => setYourExpense(() => e.target.value)}
      />

      {name}'s expense
      <text>{billValue - yourExpense}</text>

      Who is paying the bill ?
      <select
        // value={payer} 
        value={isYouPay?"You":name}
        onChange={(e) => {
          console.log("e.target.value: ", e.target.value, typeof(e.target.value));
          setIsYouPay(()=> e.target.value === "You")
          setPayer(()=> e.target.value )
        }}
      >
        <option>You</option>
        <option>{name}</option>
      </select>
      <button className="button"> Split bill</button>
    </form>
  );
}
export default App;
