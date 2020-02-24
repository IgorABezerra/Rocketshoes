import styled from 'styled-components';

import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
      color: #000;
    }

    img {
      align-self: center;
      max-width: 250px;
    }

    button {
      background: #7159c1;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;

      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#7159c1')};
      }

      &:active {
        transform: translate(0, 2px);
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }

        > span {
          color: #fff;
        }
      }

      > span {
        text-align: center;
        font-size: 12px;
        color: #fff;
        text-transform: uppercase;
        margin-left: 4px;
      }
    }
  }
`;
