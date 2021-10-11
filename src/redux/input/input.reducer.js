const INITIAL_STATE = {
  input: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        calculations: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default inputReducer;
