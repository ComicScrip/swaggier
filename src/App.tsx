import "./App.css";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { OAS } from "./types";
import Path from "./Path";
import PathForm from "./PathForm";
import TextField from "./TextField";

function App() {
  const { register, watch, setValue } = useForm<OAS>();

  useFormPersist("spec", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <div>
      <h2>General Info</h2>

      <h2>Paths</h2>

      <PathForm setSpecValue={setValue} />

      {pathArray.map((path) => (
        <Path key={path.id} path={path} />
      ))}
    </div>
  );
}

export default App;
