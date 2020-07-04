import {
  FETCHING_ENTERTAINMENT_DATA,
  FETCHING_ENTERTAINMENT_DATA_SUCCESS,
  FETCHING_ENTERTAINMENT_DATA_ERROR,
} from '../action/actionCreators';

const initialState = {
  data: [],
  isDataFetched: false,
  isFetching: false,
  isError: false,
};

export default function entertainmentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_ENTERTAINMENT_DATA:
      return {...state, data: [], isFetching: true};
    case FETCHING_ENTERTAINMENT_DATA_SUCCESS:
      return {...state, data: action.data.Search, isFetching: false};
    case FETCHING_ENTERTAINMENT_DATA_ERROR:
      return {...state, erro: true, isFetching: false};
    default:
      return state;
  }
}
