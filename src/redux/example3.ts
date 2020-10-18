import { combineReducers, createStore, bindActionCreators } from "./redux";

/* Example 3 for bindActionCreators */
function example3() {
  var count = function (
    state: Record<string, any> = {counter: 0},
    action: Record<string, any>
  ) {
    if (action.type === "INCREMENT") {
      return { ...state, counter: state.counter + 1 };
    }
  };

  var reducer = combineReducers({
    count: count,
  });

  var store = createStore(reducer);

  var actionCreators = {
    incrementCount: function () {
      return { type: "INCREMENT" };
    },
  };

  var bounded = bindActionCreators(actionCreators, store.dispatch);

  /*
    Now, bounded.incrementCount should be equal to:
    -----------------------------------------------
    store.dispatch(actionCreators.incrementCount());
    */

  document
    .querySelector("#example-3 button")
    .addEventListener("click", function () {
      bounded.incrementCount();
    });

  store.subscribe(function () {
    var state = store.getState();
    document.querySelector("#example-3 .count").innerHTML = state.count.counter;
  });
}
export {example3};
