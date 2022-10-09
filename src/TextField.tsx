import type { JSX } from "solid-js";

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
}

const TextField = ({ label, value, onInput, id }: TextFieldProps) => {
  return (
    <label for={id}>
      {label} :{" "}
      <input
        class="border border-solid p-2"
        value={value}
        onInput={onInput}
        id={id}
      />
    </label>
  );
};

export default TextField;
