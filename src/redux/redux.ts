/*** Davidux Functions,
     What this is missing from the real Redux:
     - Error checking and reporting
     - Dispatch blocking
     - replaceReducer
     - Observable
     - Preloaded state
     - More than one middleware (compose)
     ***/

/*
    Davidux 1. createStore
    - Create a store with methods:
        - 1a getState: returns the current state
        - 1b subscribe: add a listener
        - 1c unsubscribe: remove a listener
        - 1d dispatch: take an action and update the state
*/
export function createStore(reducer: Function) {
  var state: Record<string, any>;
  var listeners: any[] = [];

  function getState() {
    return state;
  }

  function subscribe(listener: Function) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1);
      listeners = [
        ...listeners.slice(0, listeners.indexOf(listener)),
        ...listeners.slice(listeners.indexOf(listener) + 1),
      ];
    };
  }

  function dispatch(action: Record<string, any>) {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }

  return {
    getState: getState,
    subscribe: subscribe,
    dispatch: dispatch,
  };
}

/*
      Davidux 2. combineReducers
      - Given an object of functions, create a single function.
      - Should allow the following:
          {key: function(state[key], action)}
  */
export function combineReducers(reducers: Record<string, any>) {
  var keys: string[] = Object.keys(reducers);
  return (state: Record<string, any>, action: Record<string, any>) => {
    state = state || {};
    var next: Record<string, any> = {};
    keys.forEach((key) => {
      next[key] = reducers[key](state[key], action);
    });
    return next;
  };
}

/*
      Davidux 3. bindActionCreators
      - Wrap an object of actionCreators in dispatch calls.
  */
export function bindActionCreators(
  actionCreators: Record<string, Function>,
  dispatch: Function
) {
  var bounded: Record<string, any> = {};
  Object.keys(actionCreators).forEach((key) => {
    var actionCreator = actionCreators[key];
    bounded[key] = (...args: any[]) => {
      dispatch(actionCreator(args));
    };
  });
  return bounded;
}

/*
      Davidux 4. applyMiddleware
      - Create a function to enhance a store.
      - We're basically creating a wrapper around `createStore` and
        overwriting the `dispatch` function to summon the middleware.
      - I'm simplifying here by only allowing one middleware,
        for more than one you would need to `compose` them together.
      applyMiddleware(middleware)(createStore)(reducer);
      function middleware(store => next => action) {}
      Conceptually, all we are doing here is overwriting dispatch with:
      -------
      dispatch = function(action) {
          return middleware(store.dispatch(action));
      }
  */
export function applyMiddleware(middleware: Function) {
  return function (createStore: Function) {
    return function (reducer: Function) {
      var store = createStore(reducer);
      return {
        getState: store.getState,
        subscribe: store.subscribe,
        dispatch: (action: Record<string, any>) =>
          middleware(store)(store.dispatch)(action),
      };
    };
  };
}
