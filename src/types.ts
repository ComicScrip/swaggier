import { InfoObject } from "@ts-stack/openapi-spec";

export type HTTPVerb = "get" | "post";

export type Endpoint = {
  summary: string;
};

export type PathObject = {
  [verb in HTTPVerb]?: Endpoint;
};

export interface OAS {
  info: InfoObject;
  paths?: {
    [pathName: string]: PathObject;
  };
}
