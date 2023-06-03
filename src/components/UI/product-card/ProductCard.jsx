import React from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const ProductCard = (props) => {
  const { id, price, session, foodPackage, remainQuantity } = props.item;
  const sessionId = session?.id
  const image = foodPackage?.image
  const foodPackageId = foodPackage?.id
  const chefId = foodPackage?.chefId
  const title = foodPackage?.name
  const dispatch = useDispatch();
  const navigate = useNavigate()
  console.log("sessionId là", sessionId)
  console.log("Chef id là", chefId)
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        title,
        image,
        price,
        chefId,
        sessionId,
        foodPackageId
      })
    );
  };

  return (
    <div className="product__item" style={{
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
    }}>
      <div className="product__img">
        <img src={foodPackage?.image} alt="product-img" className="w-100" onClick={() => navigate(`/foods/${foodPackage?.id}`)} />
      </div>
      <div className="product__content">
        <Typography style={{
          fontSize: 18,
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: 10
        }}
          onClick={() => navigate(`/foods/${foodPackage?.id}`)}
        >
          {foodPackage?.name}
        </Typography>
        <div style={{
          fontSize: 12,
          fontWeight: 'bold',
          marginLeft: 0,
          paddingBottom: 50
        }}><Tag>Remain quantity : {remainQuantity}</Tag></div>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">{price} VNĐ</span>
          <button className="addTOCart__btn" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
