let x = [1, 2, 3, 4].map((ele) => ele * 2);
console.log(x);

let a = [1, 2, 3, 4, 5];
let t = a.reduce(
  (pre, current, currentIdx, a) => (current = a[currentIdx] + pre),
  100,
  200,
  2
);
// console.log(t);

a = [4, 6, 6, 32, 4, 1, 7, 4, 6];
// const sorted = a.slice().sort((a, b) => a - b);
// console.log(sorted);

const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 5, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 6, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 7, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 8, title: "Fahrenheit 451", author: "Ray Bradbury" },
  { id: 9, title: "Moby-Dick", author: "Herman Melville" },
  { id: 10, title: "The Adventures of Huckleberry Finn", author: "Mark Twain" },
  { id: 11, title: "Jane Eyre", author: "Charlotte Brontë" },
  { id: 12, title: "Animal Farm", author: "George Orwell" },
  { id: 13, title: "War and Peace", author: "Leo Tolstoy" },
  { id: 14, title: "The Odyssey", author: "Homer" },
  { id: 15, title: "Crime and Punishment", author: "Fyodor Dostoevsky" },
  { id: 16, title: "Wuthering Heights", author: "Emily Brontë" },
  { id: 17, title: "The Iliad", author: "Homer" },
  { id: 18, title: "Brave New World", author: "Aldous Huxley" },
  { id: 19, title: "The Divine Comedy", author: "Dante Alighieri" },
  { id: 20, title: "Les Misérables", author: "Victor Hugo" },
];

// console.log(books);

// const newBook = { id: 21, title: "Cho Toan DK", author: "Hang dtt" };
// const booksAfterAdd = [...books, newBook];
// const booksAfterDel = booksAfterAdd.filter((ele) => ele.id > 9);
// // console.log(booksAfterDel)
// const booksAfterUpdate = booksAfterAdd.map((book) =>
//   book.id === 1 ? { ...book, pages: 100 } : book
// );
// console.log(booksAfterUpdate);

let getTodo = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");
  const data = await res.json();
  console.log("inside: ", data);
  return data;
};

let abc = async()=> {
    const todo = await getTodo();
    console.log("res: ", todo);
    console.log("Hang Duong");
}
abc();