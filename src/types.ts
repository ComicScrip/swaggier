import {
  HttpStatusCode,
  InfoObject,
  MediaTypeObject,
} from "@ts-stack/openapi-spec";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      model: [() => any, (v: any) => any];
    }
  }
}

export type HTTPVerb = "get" | "post" | "patch" | "put" | "options" | "delete";

export interface Response {
  description: string;
  content: MediaTypeObject;
}

export type Endpoint = {
  summary: string;
  path: string;
  verb: string;
  description?: string;
  parameters?: object;
  reponses?: {
    [statusCode in HttpStatusCode]: Response;
  };
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
