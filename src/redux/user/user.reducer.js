const INITIAL_STATE = {
  calculations: [],
  iterations: "",
  userName: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CALCULATIONS':
      return {
        ...state,
        calculations: action.payload,
        error: null
      };
    case 'SET_ITERATIONS':
      return {
        ...state,
        iterations: action.payload,
        error: null
      };
    case 'SET_USERNAME':
      return {
        ...state,
        userName: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
