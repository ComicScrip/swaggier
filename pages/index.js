import axios from "axios";
import { useEffect } from "react";

export default function Editor() {
  // const [spec, setSpec] = useState({});

  useEffect(() => {
    axios.get("/api/spec");
  }, []);

  return <div></div>;
}
