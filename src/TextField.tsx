import { FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { OAS } from "./types";

interface TextFieldProps<T extends FieldValues> {
  path: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
}

const TextField = <T extends FieldValues>({
  path,
  label,
  register,
}: TextFieldProps<T>) => {
  return (
    <label htmlFor={path}>
      {label} :{" "}
      <input {...register(path)} className="border border-solid p-2" />
    </label>
  );
};

export default TextField;
