import { createEffect, createMemo } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { Endpoint, HTTPVerb, OAS } from "./types";

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
});

export const endpoints = createMemo(
  () => {
    const paths = spec.paths || {};
    return Object.keys(paths).flatMap((path) =>
      Object.keys(paths[path]).map((verb) => paths[path][verb as HTTPVerb])
    );
  },
  [],
  { equals: false }
) as () => Endpoint[];

export const addEndpoint = (path: string, verb: HTTPVerb) => {
  if (!spec.paths) setSpec({ paths: {} });
  if (!spec?.paths?.[path]) setSpec("paths", path, {});
  setSpec("paths", path, verb, {
    path,
    verb,
    summary: "",
  });
};
