const INITIAL_STATE = {
  calculations: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CALCULATIONS':
      return {
        ...state,
        calculations: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
