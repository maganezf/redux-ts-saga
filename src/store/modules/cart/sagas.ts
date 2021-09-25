import { AxiosResponse } from 'axios';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { api } from '../../../services/api';
import { IGlobalState } from '../../index';
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from './actions';
import { ActionTypes } from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock(action: CheckProductStockRequest): Generator {
  const { product } = action.payload;

  const currentQuantity = yield select((state: IGlobalState) => {
    return (
      state.cart.items.find(item => item.product.id === product.id)?.quantity ??
      0
    );
  });

  const availableStockResponse: AxiosResponse<IStockResponse> | any =
    yield call(api.get, `/stock/${product.id}`);

  if (availableStockResponse.data.quantity > Number(currentQuantity)) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
