import { Component, createSignal } from "solid-js";
import { Endpoint as EndpointType, PathObject } from "./types";
import axios from "axios";
import { deleteEndpoint, selectedServer, setSpec } from "./specStore";

interface EndpointProps {
  endpoint: EndpointType;
}

const Endpoint: Component<EndpointProps> = function ({ endpoint }) {
  const [serverResponse, setServerResponse] = createSignal("");

  return (
    <div class="border border-solid border-black m-8">
      {endpoint.verb} {selectedServer.url}
      {endpoint.path}
      <summary>{endpoint.summary}</summary>
      <div>
        <button
          onclick={() =>
            axios({
              method: endpoint.verb,
              url: selectedServer.url + endpoint.path,
            }).then((res) =>
              setServerResponse(JSON.stringify(res.data, null, 2))
            )
          }
        >
          Send request
        </button>
        <pre>{serverResponse()}</pre>
      </div>
      <button onclick={() => deleteEndpoint(endpoint.path, endpoint.verb)}>
        Delete
      </button>
    </div>
  );
};

export default Endpoint;
