import { all } from 'redux-saga/effects';

import cartSaga from './cart/sagas';

export function* rootSaga(): Generator {
  return yield all([cartSaga]);
}
