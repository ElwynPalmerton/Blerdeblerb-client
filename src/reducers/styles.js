const init = localStorage.getItem("darkmode");

let defaultState;

if (init !== null) {
  defaultState = { darkMode: init.toString() === "true" };
} else {
  defaultState = false;
}

function stylesReducer(state = defaultState, action) {
  switch (action.type) {
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
}

export default stylesReducer;
