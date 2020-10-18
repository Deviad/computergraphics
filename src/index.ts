import { example1 } from "./redux/example1";
import { example2 } from "./redux/example2";
import { example3 } from "./redux/example3";
import { example4 } from "./redux/example4";
import "./styles/main.css";
import { createElement } from "./vdom/createElement";
import { diff } from "./vdom/diff";
import { mount } from "./vdom/mount";
import { render } from "./vdom/render";

const createVapp = (count: number) =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count,
    },
    events: {
      [EventName.CLICK]: (event: MouseEvent) => {
        console.log(event.clientX, event.clientY);
      },
    },
    children: [
      String(count),
      createElement("img", {
        attrs: {
          src: "https://media0.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
        },
        children: [],
      }),
    ],
  });
let count = 0;
const vApp = createVapp(count);
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  count++;
  console.log(count);
  // if we keep mounting a new component everytime we will see the image blinking.
  // if this was a form we would loose the focus every time it gets re-mounted.
  // this is why we need the patching mechanism.

  // $rootEl = mount(render(createVapp(count)), $rootEl);
  
  const vNewApp = createVapp(count);
  const patch: (n: HTMLElement | Text) => HTMLElement | Text = diff(
    vApp,
    vNewApp
  );
  $rootEl = patch($rootEl);
}, 1000);

console.log($app);
example1();
example2();
example3();
example4();

(module as any).hot.accept();
