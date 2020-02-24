import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';

import { formatPrice } from '../../../util/format';

import { toast } from 'react-toastify';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  if (productExists) {
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const amount = productExists.amount + 1;

    if (amount > stockAmount) {
      toast.error('Quantidade máxima no estoque excedida');
      return;
    }

    yield put(updateAmountSuccess(id, amount));
  } else {
    const { data } = yield call(api.get, `/products/${id}`);

    const cartData = {
      ...data,
      amount: 1,
      priceFormatted: formatPrice(data.price),
    };

    yield put(addToCartSuccess(cartData));

    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade máxima no estoque excedida');
    return;
  } else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
