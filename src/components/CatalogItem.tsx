import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGlobalState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

interface CatalogItemProps {
  product: IProduct;
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IGlobalState, boolean>(state =>
    state.cart.failedStockCheck.includes(product.id)
  );

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article>
      <strong>{product.title}</strong> {' - '}
      <span>{product.price}</span>
      {'  '}
      <button type='button' onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: 'red', marginLeft: 5 }}>
          Limite na falta de estoque atingido
        </span>
      )}
    </article>
  );
}
