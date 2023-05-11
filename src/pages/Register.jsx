import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { Typography, Divider } from "antd";
import logo from "../assets/images/mom-logo.png"
import '../styles/loginPage.css'
const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    // const data = { email, password }
    fetch("https://momkitchen.azurewebsites.net/api/Registration", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then((res) => {
      if (res.ok) {
        alert("Save successfully.")
      } else {
        alert("Something wrong! Cannot create your account.")
      }
      navigate('/login')
    }).catch((err) => {

      console.log(err.message)
    })
  };
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <Helmet title="Signup">
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
                    type="email"
                    placeholder="Email"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="addTOCart__btn" block type="submit" style={{
                  width: "100%",
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <h6 style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10
                  }}>Sign Up</h6>
                </button>

                <Divider style={{
                  justifyContent: 'center',
                  color: 'yellowgreen'
                }}><Link to="/login">Already have an account? Login</Link></Divider>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default Register;
