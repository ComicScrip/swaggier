import { useForm } from "react-hook-form";
import { OAS } from "./types";
import useFormPersist from "react-hook-form-persist";
import TextField from "./TextField";

const InfoForm = () => {
  const { register, watch, setValue } = useForm<OAS["info"]>();

  useFormPersist("info", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <div>
      <TextField path="title" label="Title" {...{ register }} />
      <TextField path="contact.email" label="Contact email" {...{ register }} />
    </div>
  );
};

export default InfoForm;
