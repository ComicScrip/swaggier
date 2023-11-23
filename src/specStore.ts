import { createEffect, createMemo } from "solid-js";
import { createStore, produce, SetStoreFunction, Store } from "solid-js/store";
import { Endpoint, HTTPVerb, OAS, ServerObject } from "./types";

export function createLocalStore<T extends object>(
  name: string,
  init: T
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}

export const [selectedServer, setSelectedServer] =
  createLocalStore<ServerObject>("selectedServer", {
    url: "http://localhost:3000",
    description: "dev",
  });

export const [spec, setSpec] = createLocalStore<OAS>("spec", {
  info: {
    title: "",
    version: "1.0.0",
    contact: {
      email: "",
      name: "",
      url: "",
    },
    description: "",
    license: {
      name: "",
      identifier: "",
      url: "",
    },
    summary: "",
    termsOfService: "",
  },
  paths: {},
  servers: [{ url: "http://localhost:3001", description: "the good corner" }],
});

export const endpoints = createMemo(
  () => {
    const paths = spec.paths || {};
    return Object.keys(paths).flatMap((path) =>
      Object.keys(paths[path]).map((verb) => ({
        ...paths[path][verb as HTTPVerb],
        path,
        verb,
      }))
    );
  },
  [],
  { equals: false }
) as () => Endpoint[];

export const servers = createMemo(
  () => {
    return spec.servers;
  },
  [],
  { equals: false }
) as () => ServerObject[];

export const addEndpoint = (path: string, verb: HTTPVerb) => {
  if (!spec.paths) setSpec({ paths: {} });
  if (!spec?.paths?.[path]) setSpec("paths", path, {});
  setSpec("paths", path, verb, {
    summary: "",
  });
};

export const addServer = (url: string, description: string = "") => {
  setSpec(
    produce((state) => {
      state.servers = (state.servers || []).concat({ url, description });
    })
  );
};

export const deleteServer = (url: string) => {
  setSpec(
    produce((state) => {
      state.servers.splice(
        state.servers.findIndex((s) => s.url === url),
        1
      );
    })
  );
};

export const deleteEndpoint = (path: string, verb: HTTPVerb) => {
  setSpec("paths", path, verb, undefined);
};
