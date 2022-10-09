import { Component, createSignal } from "solid-js";
import { setSpec } from "./specStore";
import TextField from "./TextField";

const EndpointForm: Component = () => {
  const [newEndpointPath, setNewEndpointPath] = createSignal("");
  const [newEndpointVerb, setNewEndpointVerb] = createSignal("get");
  return (
    <form
      onsubmit={(e) => {
        e.preventDefault();
        if (newEndpointPath() && newEndpointVerb()) {
          setSpec("endpoints", (endpoints) => [
            ...endpoints,
            {
              path: newEndpointPath(),
              verb: newEndpointVerb(),
              summary: "",
            },
          ]);
        }
      }}
    >
      <select
        id="newEndpointVerb"
        value={newEndpointVerb()}
        onInput={(e) => setNewEndpointVerb(e.currentTarget.value)}
      >
        {["GET", "POST", "PATCH", "DELETE"].map((verb) => (
          <option value={verb.toLowerCase()}>{verb}</option>
        ))}
      </select>
      <TextField
        id="newEndpointPath"
        label="Path"
        value={newEndpointPath()}
        onInput={(e) => setNewEndpointPath(e.currentTarget.value)}
      />
      <button class="bg-green-500" type="submit">
        Add
      </button>
    </form>
  );
};

export default EndpointForm;
