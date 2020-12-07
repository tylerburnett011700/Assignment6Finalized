import { VisibilityFilters } from "./constants";
import { todosRef } from "./firebase";

// The types of actions that you can dispatch to modify the state of the store
export const types = {
  SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
  FETCH_TODOS_PENDING: "FETCH_TODOS_PENDING",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_ERROR: "FETCH_TODOS_ERROR"
};

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  add: (todo) => async (dispatch) => {
    todosRef.push().set(todo);
  },
  remove: (id) => async (dispatch) => {
    todosRef.child(id).remove();
  },
  update: (todo) => async (dispatch) => {
    todosRef.child(todo.id).set({
      completed: todo.completed,
      text: todo.text
    });
  },
  setVisibilityFilter: (visibility) => {
    return { type: types.SET_VISIBILITY_FILTER, payload: visibility };
  },
  fetchTodosPending: () => {
    return { type: types.FETCH_TODOS_PENDING };
  },
  fetchTodosSuccess: (todos) => {
    return { type: types.FETCH_TODOS_SUCCESS, payload: todos };
  },
  fetchTodosError: (error) => {
    return { type: types.FETCH_TODOS_ERROR, payload: error };
  }
};

// Initial state of the store
const initialState = {
  todos: [],
  pending: false,
  error: null,
  visibilityFilter: VisibilityFilters.SHOW_ALL
};

// Function to handle actions and update the state of the store.
// Notes:
// - The reducer must return a new state object. It must never modify
//   the state object. State objects should be treated as immutable.
// - We set \`state\` to our \`initialState\` by default. Redux will
//   call reducer() with no state on startup, and we are expected to
//   return the initial state of the app in this case.
export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_TODOS_PENDING:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.payload
      };
    case types.FETCH_TODOS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case types.SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: payload
      };
    default:
      return state;
  }
};
