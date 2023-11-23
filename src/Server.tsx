import { Component } from "solid-js";
import { ServerObject } from "./types";
import { deleteServer, selectedServer, setSelectedServer } from "./specStore";

interface ServerProps {
  server: ServerObject;
}

const Server: Component<ServerProps> = function ({ server }) {
  return (
    <div
      class={`m-8 border border-solid  ${
        selectedServer.url === server.url ? "border-blue-500" : "border-black"
      }`}
    >
      <p>url : {server.url}</p>
      <p>desc : {server.description}</p>

      <button onclick={() => deleteServer(server.url)}>delete</button>
      <button onclick={() => setSelectedServer(server)}>select</button>
    </div>
  );
};

export default Server;
