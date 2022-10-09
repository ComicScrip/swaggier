import { createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { OAS } from "./types";

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
  endpoints: [],
});
