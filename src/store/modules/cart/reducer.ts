import { Reducer, AnyAction } from 'redux';
import produce from 'immer';
import { ActionTypes, ICartState } from './types';

const initialState: ICartState = {
  items: [],
  failedStockCheck: [],
};

export const cart: Reducer<ICartState> = (
  state = initialState,
  action: AnyAction
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          item => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }

      case ActionTypes.addProductToCartFailure: {
        const { productId } = action.payload;

        draft.failedStockCheck.push(productId);

        break;
      }

      default: {
        return draft;
      }
    }
  });
};
