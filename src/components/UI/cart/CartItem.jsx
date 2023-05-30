import React from "react";
import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
const CartItem = ({ item }) => {
  const { id, title, price, image, quantity, totalPrice} = item;
  const dispatch = useDispatch();
  const incrementItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        price,
        image,
      })
    );
  };

  const decreaseItem = () => {
    dispatch(cartActions.removeItem(id));
  };

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <Link to={`/foods/${item.id}`}>
          <img src={image} alt="product-img" />
        </Link>
        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{title}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>{totalPrice} VNĐ</span>
            </p >
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>
          <span className="delete__btn" onClick={deleteItem}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
      <Divider style={{
        backgroundColor:'black',
        height:"1px",
        marginTop:10
      }} />
    </ListGroupItem>
  );
};

export default CartItem;
