import React, { useEffect, useState } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useNavigate } from "react-router-dom";
import { forEach } from "mathjs";
import { Table } from "antd";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const account = localStorage.getItem('user-infor')
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(cartActions.deleteItem(id));
  };
  const navigate = useNavigate()
  const checkAccount = () => {
    if (account === null) {
      navigate("/login")
      alert("You have to sign in first.")
    } else {
      navigate('/orderForm')
      // setToggleCart1(toggleCart)
    }
  }
  return (
    <Helmet title="Cart">
      <Header />
      {showCart && <Carts />}
      <CommonSection title="Your Cart" />
      <section style={{
        backgroundColor: '#FFFFFF'
      }}>
        <Container>
          <Row>
            <Col lg="12">
              <Table
                dataSource={cartItems}
                columns={[
                  {
                    title: "Image",
                    dataIndex: 'image',
                    render: (_, record) => (
                      <img src={record.image} style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: 20
                      }}></img>
                    )
                  },
                  {
                    title: 'Product title',
                    dataIndex: 'title'
                  },
                  {
                    title: 'Price',
                    dataIndex: 'price'
                  },
                  {
                    title: 'Quantity',
                    dataIndex: 'quantity'
                  },
                  {
                    title: "Action",
                    render: (_, record) => (
                      <i className="ri-delete-bin-line" onClick={() => deleteItem(record.id)}></i>
                    )
                  }
                ]}
              >
              </Table>
              {/* )} */}
              <div className="mt-4">
                <h6>
                  Subtotal:
                  <span className="cart__subtotal">{totalAmount} VND</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/foods">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn" onClick={() => checkAccount()}>
                    {/* <Link to="/orderForm">Proceed to checkout</Link>
                   */}
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default Cart;
