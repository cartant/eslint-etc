declare module "esquery" {
  import * as es from "estree";
  declare function esquery(node: es.Node, selector: string): es.Node[];
  export = esquery;
}

declare module "estraverse" {
  declare const estraverse: {
    Syntax: Record<string, unknown>;
    VisitorKeys: Record<string, unknown>;
  };
  export = estraverse;
}
