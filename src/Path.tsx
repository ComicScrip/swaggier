import React from "react";
import { PathObject } from "./types";

const Path: React.FC<{ path: PathObject & { id: string } }> = function ({
  path,
}) {
  console.log("rendering path", path.id);

  return <div className="border border-solid border-black m-8">{path.id}</div>;
};

export default Path;
