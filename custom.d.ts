declare module "*.svg" {
  const content: any;
  export default content;
}
declare interface Attributes {
  // id: String;
  [key: string]: any;
}

declare type Elem = VNode | string | number;

declare interface Options {
  attrs: Attributes;
  children: Elem[];
}
declare interface VNode {
  tagName: string;
  attrs: Attributes;
  children: Elem[];
}
