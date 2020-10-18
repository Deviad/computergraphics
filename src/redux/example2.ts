/* Example 2 for combineReducers */

import { combineReducers, createStore } from "./redux";

function example2() {
  var count = (
    state: Record<string, any> = { counter: 0 },
    action: Record<string, any>
  ) => {
    if (action.type === "INCREMENT") {
      return { ...state, counter: state.counter + 1 };
    }
  };

  /*
    The following should be equal to doing:
    ------------------------------
    var reducer = function(state, action) {
        return {
            count: count(state.count, action)
        };
    };
    */

  var reducer = combineReducers({
    count,
  });

  var store = createStore(reducer);

  document.querySelector("#example-2 button").addEventListener("click", () => {
    store.dispatch({ type: "INCREMENT" });
  });

  store.subscribe(() => {
    var state = store.getState();
    document.querySelector("#example-2 .count").innerHTML = state.count.counter;
  });
}
export { example2 };
