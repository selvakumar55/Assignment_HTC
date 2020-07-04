import {FETCHING_ENTERTAINMENT_DATA} from './actionCreators';

export function fetchEntertainmentData(type: string) {
  return {
    type: FETCHING_ENTERTAINMENT_DATA,
    payload: type,
  };
}
