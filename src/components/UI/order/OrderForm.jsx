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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx"
import Carts from "../../UI/cart/Carts.jsx";
import { Paper, TextField, Typography } from "@mui/material";
import { Button, Space } from "antd";
const OrderForm = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Helmet title="Cart">
      <Header />
      {showCart && <Carts />}
      <section>
        <CommonSection title="Checkout" />
        <Container>
          <Paper style={{
            marginTop: 20,
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
              <TextField label="Building"
                style={{
                  margin: 20,
                }}>

              </TextField>
            </div>
          </Paper>
          <Paper style={{
            height: "100%",
            marginTop: 20,
          }}>
            <Typography style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              paddingTop: 10,
              paddingLeft: 20,
              fontSize: 20,
            }}>Order summary</Typography>
            <div>
              <List disablePadding style={{
                paddingRight: 50,
                paddingLeft: 50
              }}>
                {cartProducts.map((product) => (
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                    <div style={{
                      border: "2px solid green",
                      borderRadius: 5, 
                      padding: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                      color: 'red',
                      width: 30,
                      height: 30
                    }}>{product.quantity}x</div>
                    <ListItemText primary={product.title} secondary={product.desc} />
                    <Typography variant="body2">{product.price} VND</Typography>
                  </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary="Total" style={{
                    color: 'red'
                  }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }} style={{
                    color: 'red'
                  }}>
                    {totalAmount} VND
                  </Typography>
                </ListItem>
              </List>
            </div>
            <div style={{
              marginBottom: 10
            }}>
              <h6 style={{
                paddingLeft: 20,
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
              display: 'flex',
            }}  ></div>
            <div style={{
              position: 'relative',
              bottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Button style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}>Submit</Button>
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