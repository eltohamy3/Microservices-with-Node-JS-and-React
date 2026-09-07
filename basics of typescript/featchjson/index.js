// import axios from "axios";

// async function main() {
//   try {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
//       timeout: 10000
//     });
//     console.log(res.data);
//   } catch (err: any) {
//     console.log("message:", err.message);
//     console.log("code:", err.code);
//   }
// }

// main();
async function main() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("fetch message:", error.message);
    console.log("fetch code:", error.code);
  }
}

main();