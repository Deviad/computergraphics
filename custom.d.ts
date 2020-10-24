declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}
declare module "*.png" {
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
  ENTER = 'mouseenter',
  LEAVE = 'mouseleave',
  OVER = 'mouseover',
  MOVE = 'mousemove'
}

declare type Elem = VNode | string | number;

declare type EventCallback = (e: Event) => any | ((...args: any[]) => (e: Event)=> any);

declare interface Options {
  attrs?: Attributes;
  events?: Partial<Record<EventName, Partial<EventCallback>>>;
  children?: Elem[];
}
declare interface VNode extends Options  {
  tagName: string;
}
