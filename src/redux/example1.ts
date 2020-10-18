/* Example 1 for createStore */

import { createStore } from "./redux";

function example1() {
  var reducer = (
    state: Record<string, any> = { counter: 0 },
    action: Record<string, any>
  ) => {
    if (action.type === "INCREMENT") {
      return { ...state, counter: state.counter + 1 };
    }
  };

  var store = createStore(reducer);
  // EXAMPLE 1
  document
    .querySelector("#example-1 button")
    .addEventListener("click", function () {
      store.dispatch({ type: "INCREMENT" });
    });

  store.subscribe(() => {
    var state = store.getState();
    document.querySelector("#example-1 .count").innerHTML = String(
      state.counter
    );
  });
}

export { example1 };
