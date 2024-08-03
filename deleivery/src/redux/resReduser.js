import {
    FETCH_RESTAURANT_REQUEST,
    FETCH_RESTAURANT_SUCCESS,
    FETCH_RESTAURANT_FAILURE
  } from './actions';
  
  const initialState = {
    selectedRestaurant: null,
    menu: [],
    loading: false,
    error: null
  };
  
  const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RESTAURANT_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case FETCH_RESTAURANT_SUCCESS:
        return {
          ...state,
          selectedRestaurant: action.payload.restaurant,
          menu: action.payload.menu,
          loading: false,
          error: null
        };
  
      case FETCH_RESTAURANT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default restaurantReducer;
  