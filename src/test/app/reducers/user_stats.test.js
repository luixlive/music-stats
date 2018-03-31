import error from './../../test_utils/error';
import userStatsReducer, {
  initialState,
} from './../../../app/reducers/user_stats';
import * as types from './../../../app/actions/types';

describe('App Reducers - UserStats', () => {
  it('should return initial state', () => {
    expect(userStatsReducer(undefined, {})).toEqual(initialState);
  });

  it(types.LOAD_USER_STATS_FAILED, () => {
    const action = { type: types.LOAD_USER_STATS_FAILED, payload: { error } };
    const expectedState = { ...initialState, error };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });

  it(types.LOAD_USER_STATS_SUCCEEDED, () => {
    const action = { type: types.LOAD_USER_STATS_SUCCEEDED, payload: {} };
    const expectedState = { ...initialState, statsLoaded: true };
    expect(userStatsReducer(undefined, action)).toEqual(expectedState);
  });
});
