import { Component, For } from "solid-js";
import InfoForm from "./InfoForm";
import EndpointForm from "./EndpointForm";
import { endpoints, spec } from "./specStore";
import Endpoint from "./Endpoint";

const App: Component = () => {
  const downloadFile = (
    dataObjToWrite = {},
    filename = "spec.json",
    type = "text/json"
  ) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite)], { type });
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = [type, link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    link.dispatchEvent(evt);
    link.remove();
  };

  return (
    <div>
      <button onclick={() => downloadFile(spec)}>export</button>
      <h2>General Info</h2>
      <InfoForm />
      <h2>Paths</h2>
      <EndpointForm />
      <For each={endpoints()}>{(item) => <Endpoint endpoint={item} />}</For>
    </div>
  );
};

export default App;
