import "./styles/main.css";
import { createElement } from "./vdom/createElement";
import { diff } from "./vdom/diff";
import { mount } from "./vdom/mount";
import { render } from "./vdom/render";

// class Director {

//     static instance: Director = null;
//     init() {
//     const root = document.getElementById("root");
//         root.innerHTML = `<div class="test test--something">Testsssss</div>`
//     }

//     static getInstance() {
//         if(Director.instance == null) {
//             return new Director();
//         }
//         return Director.instance;
//     }

// }

// const instance = Director.getInstance();
// instance.init();

const createVapp = (count: number) =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count,
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
  // $rootEl = mount(render(createVapp(count)), $rootEl);
  const vNewApp = createVapp(count);
  const patch: (n: HTMLElement | Text) => HTMLElement | Text = diff(
    vApp,
    vNewApp
  );
  $rootEl = patch($rootEl);
}, 1000);

console.log($app);
(module as any).hot.accept();
