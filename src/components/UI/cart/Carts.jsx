import React from "react";

import { ListGroup } from "reactstrap";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import { useNavigate } from "react-router-dom";
import "../../../styles/shopping-cart.css";
import { useState } from "react";
import { useEffect } from "react";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [account, setAccount] = useState(localStorage.getItem('user-infor'))
  const navigate = useNavigate()
  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  const checkAccount = () => {
    if (account === null) {
      navigate("/login")
      alert("You have to sign in first.")
    } else {
      navigate('/orderForm')
    }
  }
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i className="ri-close-fill"></i>
          </span>
        </div>

        <div className="cart__item-list">
          {cartProducts.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            cartProducts.map((item, index) => (
              <CartItem item={item} key={index} />
            ))
          )}
        </div>

        <div className="cart__bottom d-flex align-items-center justify-content-between">
          <h6>
            Subtotal : <span>{totalAmount} VND</span>
          </h6>
          <button onClick={() => {
            toggleCart()
            checkAccount()
          }
          }>
            Checkout
          </button>
        </div>

      </ListGroup>
    </div>
  );
};

export default Carts;
