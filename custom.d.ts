declare module "*.svg" {
  const content: any;
  export default content;
}
declare interface Attributes {
  // id: String;
  [key: string]: any;
}
// type PickValues<T> = T[keyof T]
type PickKey<T, K extends keyof T> = Extract<keyof T, K>;


declare const enum EventName {
  CLICK = 'click',
  ENTER = 'onmouseenter',
  LEAVE = 'onmouseleave'
}

declare type Elem = VNode | string | number;

declare type EventCallback = (e: Event)=> any;

declare interface Options {
  attrs?: Attributes;
  events?: Partial<Record<EventName, EventCallback>>;
  children?: Elem[];
}
declare interface VNode extends Options  {
  tagName: string;
}
