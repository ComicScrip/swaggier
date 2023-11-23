import { Component, createSignal } from "solid-js";
import TextField from "./TextField";
import { addServer } from "./specStore";

const ServerForm: Component = () => {
  const [newServerUrl, setNewServerUrl] = createSignal("");
  const [newServerDescription, setNewServerDescription] = createSignal("");
  return (
    <form
      onsubmit={(e) => {
        e.preventDefault();
        if (newServerUrl()) {
          addServer(newServerUrl(), newServerDescription());
        }
      }}
    >
      <TextField
        id="newServerUrl"
        label="URL"
        value={newServerUrl()}
        onInput={(e) => setNewServerUrl(e.currentTarget.value)}
      />
      <TextField
        id="newServerDescription"
        label="Description"
        value={newServerDescription()}
        onInput={(e) => setNewServerDescription(e.currentTarget.value)}
      />
      <button class="bg-green-500" type="submit">
        Add
      </button>
    </form>
  );
};

export default ServerForm;
