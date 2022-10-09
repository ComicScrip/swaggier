import { Component, For } from "solid-js";
import InfoForm from "./InfoForm";
import EndpointForm from "./EndpointForm";
import { spec } from "./specStore";
import { Endpoint as EndpointType, HTTPVerb } from "./types";
import Endpoint from "./Endpoint";

const App: Component = () => {
  return (
    <div>
      <h2>General Info</h2>
      <InfoForm />
      <h2>Paths</h2>
      <EndpointForm />
      <For each={spec.endpoints}>{(item) => <Endpoint endpoint={item} />}</For>
    </div>
  );
};

export default App;
