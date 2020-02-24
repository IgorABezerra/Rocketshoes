import React from 'react';

import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

import { formatPrice } from '../../util/format';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QRD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>

              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>

              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>

                  <input type="number" readOnly value={product.amount} />

                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>

              <td>
                <strong>R$ {product.subtotal}</strong>
              </td>

              <td>
                <button type="button" onClick={() => removeFromCart(product)}>
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ {total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

/**
 * Permite a utilização das Actions criadas na estrutura do Storage.
 * As funções devem ser recebidas como Props
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

/**
 * Permite a utilização de States salvos no Storage do Redux.
 * Os states são recebidos como Props
 * @param {*} state
 */
const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
});

/**
 * Connect tem que ser utilizado p/ realizar a conexão com o Redux
 * Ele recebe dois parametros, o primeiro sempre é o mapStateToProps, o segundo sempre é o mapDispatchToProps
 * Ele retorna uma função que deve ser a Render da page/component
 */
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
