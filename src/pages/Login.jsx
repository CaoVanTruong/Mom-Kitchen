import React, { useRef, useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { accountAction } from "../store/account/accountSlice";
import { Authenticate } from "../API/login/loginController";
import '../styles/loginPage.css'
import { Typography, Button, Divider } from "antd";
import logo from "../assets/images/mom-logo.png"
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [test, setTest] = useState("acong@gmail.com")
  const [user, setUser] = useState([])
  const [checkedAccount, setCheckedAccount] = useState("")
  const [checkedPassword, setCheckedPassword] = useState("")
  const [role, setRole] = useState(0)
  const [boolean, setBoolean] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authenticatedAccount = useSelector((state) => state.account.accounts)
  // const cartItems = useSelector((state) => state.cart.cartItems);
  const list = authenticatedAccount.map((acc) => acc.email)
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email + password)
    fetch('https://momkitchen.azurewebsites.net/api/Login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Something went wrong!')
      })
      .then((res) => {
        console.log(res.role.id)
        if (res.role.id === 2) {
          if (res.accountStatus.toLowerCase() === "true") {
            localStorage.setItem('user-infor', res.email)
            navigate('/user')
          } else {
            alert("Your account is banned")
          }
        } else if (res.role.id === 1) {
          if (res.accountStatus.toLowerCase() === "true") {
            localStorage.setItem('user-infor', res.email)
            navigate('/dashboard')
          } else {
            alert("Your account is banned")
          }
        } else {
          alert("Wrong email or password!")
        }
      }).catch((e) => {
        alert("Wrong email or password!")
      })
  }
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <Helmet title="Login">
      <Header />
      {showCart && <Carts />}
      <section className="gradient">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                <Typography.Title>Welcome to Mom-Kitchen!</Typography.Title>
                <div className="form__group">
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div><Label style={{
                  color: 'red'
                }}
                  value={error}
                >
                </Label></div>
                <button className="addTOCart__btn" block type="submit" style={{
                  width: "100%",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <h6 style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10
                  }}>Sign In</h6>
                </button>

                <Divider style={{
                  borderColor: 'black',
                  justifyContent: 'center',
                  color: 'yellowgreen'
                }}><Link to="/register">Don't have an account? Create an account</Link></Divider>

              </form>

            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default Login;
