import { example4 } from "./redux/example4";
import "./styles/main.css";
import saloon from "./images/saloon.jpg";
import cowboy from "./images/yosemite_sam.png";
import { createElement } from "./vdom/createElement";
import { mount } from "./vdom/mount";
import { render } from "./vdom/render";

const prepareCss = (object: Record<string, string>) => {
  let s = "";
  for (const [k, v] of Object.entries(object)) {
    s = s + `${k}:${v};`;
  }
  return s;
};

let memoizedImage: any = null;

// function draw() {
//   var ctx = document.getElementById("canvas").getContext("2d");
//   var img = new Image();
//   img.onload = function () {
//     ctx.drawImage(img, 0, 0);
//     ctx.beginPath();
//     ctx.moveTo(30, 96);
//     ctx.lineTo(70, 66);
//     ctx.lineTo(103, 76);
//     ctx.lineTo(170, 15);
//     ctx.stroke();
//   };
//   img.src = "https://mdn.mozillademos.org/files/5395/backdrop.png";
// }

function drawImage(el: HTMLCanvasElement, event: MouseEvent) {
  console.log("test");
  let image = new Image();
  const context = el.getContext("2d");
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left * 8; //x position within the element.
  const y = event.clientY - rect.top * 2; //y position w
  // const imagePath = `${location.protocol}//${location.hostname}:${location.port}/${cowboy}`;
  image.src = cowboy;
  context.clearRect(prevX, prevY, 125, 200);
  prevX = x;
  prevY = y;
  context.drawImage(image, x, y, 125, 200);
  memoizedImage = image;
  return context;
}

// const memoizedComponent = (fn: Function) => {
//   let state: any = null;
//   return (...args: any[]) => {
//     if (state != null) {
//       return state;
//     } else {
//       state = fn;
//     }
//     return fn.apply(null, args);
//   };
// };
let prevX: any = null;
let prevY: any = null;
const createVapp = (count: number) =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count,
    },
    children: [
      createElement("h2", {
        children: ["Play with Yosemite Sam!"],
      }),
      createElement("canvas", {
        events: {
          [EventName.MOVE]: (el: HTMLCanvasElement) => (event: MouseEvent) => {
            drawImage(el, event);
          },
        },
        attrs: {
          width: 1000,
          height: 500,
          style: prepareCss({
            background: `url(${saloon})`,
            "background-size": "contain",
          }),
        },
        children: [],
      }),
    ],
  });
let count = 0;
const vApp = createVapp(count);
const $app = render(vApp);

let $rootEl = mount($app, document.getElementById("app"));

// setInterval(() => {
//   count++;
//   console.log(count);
//   // if we keep mounting a new component everytime we will see the image blinking.
//   // if this was a form we would loose the focus every time it gets re-mounted.
//   // this is why we need the patching mechanism.

//   // $rootEl = mount(render(createVapp(count)), $rootEl);

//   const vNewApp = createVapp(count);
//   const patch: (n: HTMLElement | Text) => HTMLElement | Text = diff(
//     vApp,
//     vNewApp
//   );
//   $rootEl = patch($rootEl);
// }, 1000);

console.log($app);
// example4();

// (module as any).hot.accept();
