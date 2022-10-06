import React from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { Endpoint, OAS } from "./types";
import useFormPersist from "react-hook-form-persist";

const defaultEndpoint: Endpoint = { summary: "" };

const PathForm: React.FC<{ setSpecValue: UseFormSetValue<OAS> }> = ({
  setSpecValue,
}) => {
  const { register, watch, setValue, handleSubmit } = useForm<{
    name: string;
    verb: string;
  }>();

  useFormPersist("newPath", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <form
      onSubmit={handleSubmit(({ verb, name }) => {
        if (name && verb)
          setSpecValue(`paths.${name}`, {
            [verb]: defaultEndpoint,
          });
      })}
    >
      <select {...register("verb", { required: true })}>
        {["GET", "POST", "PATCH", "DELETE"].map((verb) => (
          <option key={verb} value={verb.toLowerCase()}>
            {verb}
          </option>
        ))}
      </select>
      <input {...register("name", { required: true })} />

      <button className="bg-green-500" type="submit">
        Add
      </button>
    </form>
  );
};

export default PathForm;
