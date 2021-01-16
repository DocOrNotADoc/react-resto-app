const initialState = {
  error: false,
  menu: [],
  loading: true
}

const reducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        error: false,
        menu: action.payload,
        loading: false
      };
    case 'MENU_REQUESTED':
      return {
        error: false,
        menu: state.menu,
        loading: true
      };
    case 'MENU_ERROR':
      return {
        error: true,
        menu: state.menu,
        loading: false
      };
    default:
      return state;
  }
}

export default reducer;