import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <h1>Blossom Flowers</h1>
}

export default App;