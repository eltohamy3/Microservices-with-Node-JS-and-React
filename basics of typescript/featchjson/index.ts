import axios from "axios";


interface Test {
  status : string ;
  method : string
}
async function main() {
  try {
    const res = await axios.get("https://dummyjson.com/test");
    const mytest = res.data as Test ;
    logTest(mytest.status , mytest.method)
  } catch (error: any) {
    console.log("message:", error.message);
    console.log("code:", error.code);
  }
}
const logTest = (status : string , method: string )=>{
  console.log("status : " , status); 
  console.log("method : " , method);

}

main();