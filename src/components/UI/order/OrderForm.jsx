import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import CommonSection from "../common-section/CommonSection";
import Helmet from "../../Helmet/Helmet";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Header from "../../Header/Header.jsx";
import Footer from "../../Footer/Footer.jsx"
import Carts from "../../UI/cart/Carts.jsx";
import { Paper, TextField, Typography, Divider } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { Button, Space } from "antd";
import { Container, Row, Col } from "reactstrap"
import PaypalCheckout from "../../Paypal/PaypalCheckout";
const OrderForm = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [totalPrice, setTotalPrice] = useState(totalAmount)
  const [note, setNote] = useState("")
  const [inforUser, setInforUser] = useState({})
  console.log("email hiện tại là " + localStorage.getItem('user-infor'))
  console.log("sessionId hiện tại là" + JSON.stringify(cartProducts))
  useEffect(() => {
    if (totalAmount === 0) {
      setTotalPrice(1)
    } else {
      const dollar = totalAmount / 23000
      setTotalPrice(evaluate(dollar.toFixed(2)))
      console.log("total price ne " + totalPrice)
    }
  }, [totalAmount])
  useEffect(() => {
    fetch('https://momkitchen.azurewebsites.net/api/Account/getallcustomerbyemail?email=' + localStorage.getItem('user-infor'), {
      method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setInforUser(data)
      setBuildingOnChange(data.defaultBuilding)
      setNameOnChange(data.name)
      setPhoneOnChange(data.phone)
    })
  }, [])
  // const { name, defaultBuilding, phone } = inforUser
  const [buildingOnChange, setBuildingOnChange] = useState()
  const [nameOnChange, setNameOnChange] = useState()
  const [phoneOnChange, setPhoneOnChange] = useState()
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
            }}>User's information</Typography>
            <div className="CusInfor" style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Container>
                <Row className="mb-2" lg="12">
                  <Col>
                    <TextField
                      label="Name"
                      variant="filled"
                      defaultValue="Customer name"
                      value={nameOnChange}
                      onChange={(e) => setNameOnChange(e.target.value)}
                      style={{
                        width: "100%"
                      }}
                    >
                    </TextField>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col>
                    <TextField
                      label="Building"
                      variant="filled"
                      required
                      type="number"
                      defaultValue="1"
                      value={buildingOnChange}
                      InputProps={{ inputProps: { min: 1, max: 15 } }}
                      onChange={(e) => setBuildingOnChange(e.target.value)}
                      style={{
                        width: "100%"
                      }}>
                    </TextField>
                  </Col>
                  <Col>
                    <TextField
                      label="Phone"
                      variant="filled"
                      type="phone"
                      defaultValue="038 1111 2222"
                      value={phoneOnChange}
                      onChange={(e) => setPhoneOnChange(e.target.value)}
                      required
                      style={{
                        width: "100%"
                      }}
                    >
                    </TextField>
                  </Col>
                </Row>
                <Row className="mb-2">
                </Row>
              </Container>

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
                  <ListItem key={product.name} sx={{ py: 1, px: 0 }} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 20
                  }}>
                    <Space>
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
                        height: 30,
                        fontSize: 20,
                        position: 'relative'
                      }}>{product.quantity}x</div>
                      <div style={{
                        fontSize: 24,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>{product.title}</div>
                    </Space>
                    {/* <ListItemText primary={product.title}/> */}
                    <Typography variant="body2"><span style={{ fontSize: 24, fontWeight: 'bold' }}>{product.price} VND</span></Typography>
                  </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText><span style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: 'red',
                    padding: 20
                  }}>Total</span></ListItemText>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }} style={{
                    fontSize: 20,
                    color: 'red',
                    padding: 20
                  }}>
                    {totalAmount} VND
                  </Typography>
                </ListItem>
                <ListItem>
                  <div style={{
                    width: "100vw"
                  }}>
                    <Typography variant="h5" style={{
                      marginBottom: 10
                    }}>Note</Typography>
                    <Textarea
                      width={1000}
                      placeholder="Note here for chef..."
                      minRows={2}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </ListItem>
              </List>
            </div>
            <div style={{
              marginBottom: 10,
            }}>
              <h6 style={{
                paddingLeft: 20,
              }}>Payment</h6>
              <span style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100
              }}>
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}  >
              <PaypalCheckout price={totalPrice} email={localStorage.getItem('user-infor')} note={note} building={buildingOnChange} phone={phoneOnChange}/>
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
  const { id, image, title, price, quantity } = props.item;
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
        <img src={image} alt="" />
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