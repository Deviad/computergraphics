import { combineReducers, applyMiddleware, createStore } from "./redux";

/* Example 4 for applyMiddleware */

function example4() {
  var count = function (
    state = { counter: 0 },
    action: Record<string, any>
  ) {
    if (action.type === "INCREMENT") {
      return { ...state, counter: state.counter + 1 };
    }
  };

  var reducer = combineReducers({
    count: count,
  });

  function $async(store: Record<string, any>) {
    return (next: Function) => {
      return (action: Record<string, any>) => {
        var result = next(action);
        // if (action.type === "INCREMENT") {
        //   const counter = store.getState().count.counter;
        //   console.log("counter", counter);
        //   alert(`Incremented! ${counter}`);
        // }
        if (typeof action === 'function') {
          return action(store.dispatch, store.getState);
        }
        return result;  
      };
    };
  }

  var store = applyMiddleware($async)(createStore)(reducer);

  document.querySelector("#example-4 button").addEventListener("click", () => {
    store.dispatch({ type: "INCREMENT" });
  });

  store.subscribe(()=> {
    var state = store.getState();
    document.querySelector("#example-4 .count").innerHTML = state.count.counter;
  });
}

export { example4 };
