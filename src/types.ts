import { InfoObject, OasObject } from "@ts-stack/openapi-spec";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}

export type HTTPVerb = "get" | "post";

export type Endpoint = {
  summary: string;
  path: string;
  verb: string;
};

export type PathObject = {
  [verb in HTTPVerb]?: Endpoint;
};

export interface OAS {
  info: InfoObject;
  paths?: {
    [path: string]: PathObject;
  };
}
