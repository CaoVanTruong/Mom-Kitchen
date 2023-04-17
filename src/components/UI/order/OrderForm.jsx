import React from "react";

import CommonSection from "../common-section/CommonSection";
import Helmet from "../../Helmet/Helmet";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import { cartActions } from "../store/shopping-cart/cartSlice";
// import 

import { Link } from "react-router-dom";
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx"
import Carts from "../../UI/cart/Carts.jsx";
import { Paper, TextField, Typography } from "@mui/material";
import { Button, Space } from "antd";
import { red } from "@mui/material/colors";
const OrderForm = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  return (
    <Helmet title="Cart">
      <Header />
      {showCart && <Carts />}
      <section>
        <CommonSection title="Checkout" />
        <Container>
          <Paper style={{
            marginTop: 20
          }}>
            <Typography style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              paddingTop: 10,
              paddingLeft: 20,
              fontSize: 20,
              color: 'green'
            }}>Address</Typography>
            <div className="CusInfor" style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Space>
                <div className="NameAndPhone" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 20
                }}>
                  <TextField
                    label="Name"
                    style={{
                      marginRight: 10
                    }}
                  >
                  </TextField>
                  <TextField
                    label="Phone">
                  </TextField>

                </div>
              </Space>
              <TextField label="Address"
                style={{
                  margin: 20,
                }}>
                Room 248 , Building 3 ,D2 , Vinhome Park ,Distric 9
              </TextField>
            </div>
          </Paper>
          <Paper style={{
            height: 500,
            marginTop: 20
          }}>
            <Typography style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              paddingTop: 10,
              paddingLeft: 20,
              fontSize: 20,
              color: 'green'
            }}>Food</Typography>
            <div className="CusFood" style={{
              padding: 20
            }}>
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <Tr item={item} key={item.id} />
                    ))}
                  </tbody>
                </table>
              )}
              <div className="mt-4" style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <span className="cart__subtotal" style={{
                  color: 'black'
                }}>
                  Subtotal:
                </span>
                <span className="cart__subtotal" >{totalAmount} VND</span>
              </div>
            </div>
            <div>
              <h6 style={{
                paddingLeft: 20
              }}>Payment</h6>
              <FormControl style={{
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
              }} >
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <Space>
                    <FormControlLabel value="female" control={<Radio />} label="Cash Only" />
                    <FormControlLabel value="male" control={<Radio />} label="Payment by MoMo" />
                  </Space>
                </RadioGroup>
              </FormControl>
            </div>
            <div style={{
              display:'flex',
              justifyContent:'center',
              marginTop:80,
            }}>
              <Button>Submit</Button>
            </div>
          </Paper>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};


export default OrderForm;
const Tr = (props) => {
  const { id, image01, title, price, quantity } = props.item;
  const dispatch = useDispatch();

  const deleteItem = () => {
    dispatch(cartActions.deleteItem(id));
  };
  return (
    <tr style={{
      textDecorationLine: 'none',
      margin: 20
    }}>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
      </td>
      <td className="text-center">{title}</td>
      <td className="text-center">{price} VND</td>
      <td className="text-center">{quantity}px</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};