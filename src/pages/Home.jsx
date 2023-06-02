import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import heroImg from "../assets/images/Food-Delivery.png";

import "../styles/hero-section.css";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { ShoppingCartOutlined } from '@ant-design/icons';
import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";
import ProductCard from "../components/UI/product-card/ProductCard.jsx";
import whyImg from "../assets/images/location.png";
import networkImg from "../assets/images/network.png";
import TestimonialSlider from "../components/UI/slider/TestimonialSlider.jsx";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllSession } from "../API/admin/SessionAndBatch.js";
import { getAllSessionPackage } from "../API/user/userAPI.jsx";
import { Paper } from "@mui/material";
import { Tag } from 'antd'
import { cartActions } from "../store/shopping-cart/cartSlice.js";
const featureData = [
  {
    title: "Quick Delivery",
    imgUrl: featureImg01,
    desc: " If your app offers an on-time delivery guarantee, make sure to communicate this to potential clients. Assuring customers that their orders will arrive within a specific timeframe can instill trust and reliability.",
  },

  {
    title: "Super Dine In",
    imgUrl: featureImg02,
    desc: "Catering to individual preferences can attract clients who have specific dietary needs or preferences.",
  },
  {
    title: "Easy Pick Up",
    imgUrl: featureImg03,
    desc: "Quick and Efficient Process: Emphasize that the pick-up process is designed to be quick and efficient, ensuring minimal waiting time for customers.",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState([]);
  const cartItem = useSelector((state) => state.cart.cartItems)
  const [filterArray, setFilterArray] = useState([])
  const [chefValue, setChefValue] = useState()
  const chefValueId = cartItem.map((i) => i.chef)[0];
  const dispatch = useDispatch();
  useEffect(() => {
    if (getAllSessionPackage()) {
      getAllSessionPackage().then(response => {
        console.log("response trong hàm get là",response)
        setAllProducts(response)
      })
    } else {
      alert("Something went wrong at loading ! Try again")
    }
  }, [])
  console.log("allproduct bện home là" + allProducts)
  const filteredArray = chefValueId ? allProducts.filter((item) => item.foodPackage?.chefId === chefValueId) : [];
  console.log("filtered array là : " + JSON.stringify(filteredArray[0]))

  // function handleFilter(chefId) {
  //   const newData = allProducts.filter(food => {
  //     return food.foodPackage.chefId === chefId
  //   })
  //   setAllProducts(newData)
  // }
  // useEffect(() => {
  //   const { chefId } = cartItem
  //   handleFilter(chefId)
  //   console.log(chefId)

  //   // const newArray = allProducts.filter((item) => item.foodPackage.chefId === chef)
  //   // setAllProducts(newArray)
  //   // allProducts.filter((item) => item.foodPackage.chefId === chef)
  // }, [cartItem])

  // useEffect(() => {
  //   const filteredPizza = products.filter((item) => item.category === "Pizza");
  //   const slicePizza = filteredPizza.slice(0, 4);
  //   setHotPizza(slicePizza);
  // }, []);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <Helmet title="Home">
      <Header />
      {showCart && <Carts />}
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h5 className="mb-3">Easy way to make an order</h5>
                <h1 className="mb-4 hero__title">
                  <span>HUNGRY?</span> Just wait <br /> food at
                  <span> your door</span>
                </h1>
                <p>
                  MomKitchen-Platform connect between customers with family-liked meals chef.
                </p>

                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Order now <i className="ri-arrow-right-s-line"></i>
                  </button>

                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>

                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-car-line"></i>
                    </span>{" "}
                    No shipping charge
                  </p>

                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i className="ri-shield-check-line"></i>
                    </span>{" "}
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="pt-0">
        <Category />
      </section> */}

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">What we serve</h5>
              <h2 className="feature__title">Just sit back at home</h2>
              <h2 className="feature__title">
                we will <span>take care</span>
              </h2>
              <p className="mb-1 mt-4 feature__text">
                Stress-Free Experience: Emphasize that customers can relax and enjoy their time at home while your app takes care of their food needs. Highlight the convenience of ordering meals without the hassle of cooking or going out.
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <Paper style={{
                padding: 10
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span><ShoppingCartOutlined style={{
                    fontSize: 50,
                    marginRight: 10,
                  }} /></span>
                  <h2 style={{
                    color: '#DF2020'
                  }}>Mom-Kitchen's Market</h2>
                </div>
                <Tag color='green'
                  onClick={() => dispatch(cartActions.deleteItem(cartItem.id))}
                >
                  Lunch: 10h30-14h30</Tag>
                <Tag color='geekblue'>Dinner: 17h30-20h30</Tag>
              </Paper>
            </Col>
            {
              (chefValueId == "" || chefValueId == null) ?
                allProducts.filter((item)=> item.remainQuantity > 0 ).map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                    <ProductCard item={item} />
                  </Col>
                )) : filteredArray.filter((item)=> item.remainQuantity > 0).map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                    <ProductCard item={item} />
                  </Col>
                ))
            }

          </Row>
        </Container>
      </section>

      <section className="why__choose-us">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <img src={whyImg} alt="why-tasty-treat" className="w-100" />
            </Col>

            <Col lg="6" md="6">
              <div className="why__tasty-treat">
                <h2 className="tasty__treat-title mb-4">
                  Why <span>Mom-Kitchen?</span>
                </h2>
                <p className="tasty__treat-desc">
                  Time and Effort Savings: Emphasize the time and effort saved by using your app.
                  Mention that customers can avoid grocery shopping, meal preparation, and cleaning up afterward,
                  allowing them to focus on other activities or spend quality time with loved ones.
                </p>

                <ListGroup className="mt-4">
                  <ListGroupItem className="border-0 ps-0">
                    <p className=" choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Fresh and tasty
                      foods
                    </p>
                    <p className="choose__us-desc">
                      Food are chosen new by chef every day
                    </p>
                  </ListGroupItem>

                  <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i className="ri-checkbox-circle-line"></i> Quality support
                    </p>
                    <p className="choose__us-desc">
                      Always support in working time by phone.
                    </p>
                  </ListGroupItem>
                  {/* <ListGroupItem className="border-0 ps-0">
                    <p className="choose__us-title d-flex align-items-center gap-2 ">
                      <i class="ri-checkbox-circle-line"></i>Order from any
                      location{" "}
                    </p>
                    <p className="choose__us-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Qui, earum.
                    </p>
                  </ListGroupItem> */}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="pt-0">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5 ">
              <h2>Hot Deals</h2>
            </Col>
            {allProducts.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section> */}

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="testimonial ">
                <h5 className="testimonial__subtitle mb-4">Testimonial</h5>
                <h2 className="testimonial__title mb-4">
                  What our <span>customers</span> are saying
                </h2>
                <p className="testimonial__desc">
                  <ul>
                    <li>
                      "The food app is so convenient! I can easily order my favorite meals with just a few taps, saving me time and effort."
                    </li>

                    <li>
                      "I love the wide range of restaurant options available on the app. It's like having a world of cuisines at my fingertips."
                    </li>
                  </ul>


                </p>

                <TestimonialSlider />
              </div>
            </Col>

            <Col lg="6" md="6">
              <img src={networkImg} alt="testimonial-img" className="w-100" />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default Home;
