import { Component, For } from "solid-js";
import InfoForm from "./InfoForm";
import EndpointForm from "./EndpointForm";
import { endpoints, setSpec, spec } from "./specStore";
import Endpoint from "./Endpoint";
import dayjs from "dayjs";

const App: Component = () => {
  const downloadFile = (
    dataObjToWrite = {},
    filename = `spec-${dayjs().format("YYYYMMDD-HHmmss")}.json`,
    type = "text/json"
  ) => {
    const blob = new Blob([JSON.stringify(dataObjToWrite, null, 2)], { type });
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

  const importFile = async (file: File) => {
    setSpec(JSON.parse(await file.text()));
  };

  return (
    <div>
      <button onclick={() => downloadFile(spec)}>export</button>
      <input
        type="file"
        id="spec"
        name="spec"
        accept="application/json"
        onchange={(e) => {
          if (e?.currentTarget?.files?.[0])
            importFile(e.currentTarget.files[0]);
        }}
      />

      <h2>General Info</h2>
      <InfoForm />
      <h2>Paths</h2>
      <EndpointForm />
      <For each={endpoints()}>{(item) => <Endpoint endpoint={item} />}</For>
    </div>
  );
};

export default App;
