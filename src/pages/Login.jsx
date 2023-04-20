import React, { useRef, useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
const Login = () => {
  // const loginNameRef = useRef();
  // const loginPasswordRef = useRef();
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [allProducts, setAllProducts] = useState([]);

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate()
  const handleInputChange1 = (e) => {
    setLoginName(e.target.value)
  }

  const handleInputChange2 = (e) => {
    setLoginPassword(e.target.value)
  }
  // useEffect(() => {
  //   async function getAllUser() {
  //     // try {
  //     //   const requestUrl = 'https://momkitchen.azurewebsites.net/api/User'
  //     //   const response = await fetch(requestUrl, {
  //     //     method: 'GET',
  //     //     withCredentials: true,
  //     //     crossorigin: true,
  //     //     mode: "no-cors"
  //     //   })
  //     //   console.log(response)
  //     //   const responseJSON = await response.json()
  //     //   console.log()
  //     //   console.log('This log is call on function get API')
  //     //   const newUser = responseJSON
  //     //   setAllUsers([newUser])
  //     // } catch (error) {
  //     //   console.log("failed", error.message)
  //     // }
  //     console.log('getapi')
  //     fetch('https://ubahthebuilder.tech/posts/1',{
  //       mode:'no-cors'
  //     })
  //       .then(data => {
  //         return data.json();
  //       })
  //       .then(post => {
  //         console.log(post.title);
  //       });
  //   }
  //   getAllUser();
  // },)

  // const loginHandler = () => {
  //   console.log("Vao dc day khong?")
  //   allUsers.map((item) => {
  //     if (item.username.equals(loginName) && item.password.equals(loginPassword)) {
  //       console.log("adsaddasda")
  //       if (item.roleId === 1) {
  //         console.log("Vao dc day khong?")
  //         console.log("Dang nhap dc khong")
  //         navigate('/home')

  //       } else {
  //         navigate('/adminHome')
  //       }
  //     } else {
  //       alert("Your account or password is invalid!")
  //       console.log("Sai mat khau")
  //     }
  //   })
  // }
  const submitHandler = (e) => {
    e.preventDefault();

  };
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  return (
    <Helmet title="Login">
      <Header />
      {showCart && <Carts />}

      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5">
                <div className="form__group">
                  <input
                    placeholder="Email"
                    type="email"
                    required
                    value={loginName}
                    onChange={handleInputChange1}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    autoComplete="on"
                    value={loginPassword}
                    onChange={handleInputChange2}
                  />
                </div>
                <button className="addTOCart__btn">
                  <Link to='/home'>Sign in</Link>
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default Login;
