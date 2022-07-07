const init = localStorage.getItem("darkmode");

const defaultState = { darkMode: init.toString() === "true" };

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
