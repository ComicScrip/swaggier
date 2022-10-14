import { Component, createSignal } from "solid-js";
import { addEndpoint, setSpec, spec } from "./specStore";
import TextField from "./TextField";
import { HTTPVerb } from "./types";

const EndpointForm: Component = () => {
  const [newEndpointPath, setNewEndpointPath] = createSignal("");
  const [newEndpointVerb, setNewEndpointVerb] = createSignal<HTTPVerb>("get");
  return (
    <form
      onsubmit={(e) => {
        e.preventDefault();
        if (newEndpointPath() && newEndpointVerb()) {
          addEndpoint(newEndpointPath(), newEndpointVerb());
        }
      }}
    >
      <select
        id="newEndpointVerb"
        value={newEndpointVerb()}
        onInput={(e) => setNewEndpointVerb(e.currentTarget.value as HTTPVerb)}
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
