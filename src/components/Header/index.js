import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo.svg';

import { MdShoppingBasket } from 'react-icons/md';
import { Container, Cart } from './styles';

function Headers({ cartSize }) {
  return (
    <Container>
      <Link to="/">
        <img src={Logo}></img>
      </Link>

      <Cart to="/cart">
        <div>
          <strong> Meu Carrinho </strong>
          <span> {cartSize} Itens </span>
          <MdShoppingBasket size={36} color="#fff" />
        </div>
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartSize: state.cart.length,
}))(Headers);
