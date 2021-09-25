import { useSelector } from 'react-redux';
import { IGlobalState } from '../store';
import { ICartItem } from '../store/modules/cart/types';

export function Cart() {
  const cart = useSelector<IGlobalState, ICartItem[]>(
    state => state.cart.items
  );

  console.log(cart);

  return (
    <table style={{ border: '1px solid black' }}>
      <thead>
        <th>Produto</th>
        <th>Preço</th>
        <th>Quantidade</th>
        <th>Subtotal</th>
      </thead>

      <tbody>
        {cart.map(item => (
          <tr key={item.product.id}>
            <td>{item.product.title}</td>
            <td>{item.product.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
