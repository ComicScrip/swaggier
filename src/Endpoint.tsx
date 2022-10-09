import { Component, createSignal } from "solid-js";
import { Endpoint as EndpointType, PathObject } from "./types";
import axios from "axios";

interface EndpointProps {
  endpoint: EndpointType;
}

const Endpoint: Component<EndpointProps> = function ({
  endpoint: { verb, path },
}) {
  const [serverResponse, setServerResponse] = createSignal("");

  return (
    <div class="border border-solid border-black m-8">
      {verb} {path}
      <div>
        <button
          onclick={() =>
            axios({
              method: verb,
              url: path,
            }).then((res) =>
              setServerResponse(JSON.stringify(res.data, null, 2))
            )
          }
        >
          Send request
        </button>
        <pre>{serverResponse()}</pre>
      </div>
    </div>
  );
};

export default Endpoint;
