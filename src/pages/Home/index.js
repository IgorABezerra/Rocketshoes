import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MdShoppingBasket } from 'react-icons/md';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

function Home({ amount, addToCartRequest }) {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const { data } = await api.get('/products', {});

    const newData = data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    setProducts([...newData]);
  }

  async function handleAddProduct(id) {
    addToCartRequest(id);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductList>
      {products.map(prod => (
        <li key={prod.id}>
          <img src={prod.image} alt="Tênis" />

          <strong>{prod.title}</strong>
          <span>{prod.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(prod.id)}>
            <div>
              <MdShoppingBasket size={24} color="#fff" />
              <span>{amount[prod.id] || 0}</span>
            </div>
            <span> Adicionar ao Carrinho </span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
