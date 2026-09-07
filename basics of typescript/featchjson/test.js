// const https = require("https");

// https
//   .get("https://jsonplaceholder.typicode.com/todos/1", (res) => {
//     let data = "";

//     res.on("data", (chunk) => {
//       data += chunk;
//     });

//     res.on("end", () => {
//       console.log(data);
//     });
//   })
//   .on("error", (err) => {
//     console.log("https error message:", err.message);
//     console.log("https error code:", err.code);
//   });
