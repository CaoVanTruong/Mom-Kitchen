import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { Space, Tag, Typography } from "antd";
import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Carts from "../components/UI/cart/Carts.jsx";
import { getDishByFoodPackageId, getFoodPackageById } from "../API/user/userAPI";
import { Paper, private_createTypography } from "@mui/material";

const FoodDetails = () => {
  const foodPackageTemplate =
  {
    name: "Là name",
    image: "",
    defaultPrice: 0,
    description: "",
    foodPackageStyleId: ""
  }

  const dispatch = useDispatch();
  const [tab, setTab] = useState("desc");
  const [allProducts, setAllProducts] = useState([]);
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [food, setFood] = useState({})
  const [allDishInFoodPackage, setAllDishInFoodPackage] = useState([])
  // const [price, setPrice] = useState()
  const { id } = useParams();
  useEffect(() => {
    const fetchPackageFood = () => {
      fetch("https://momkitchen.azurewebsites.net/api/FoodPackage/getallsessionpackagebyfoodpacakgeid?foodpackageid=" + id).then(res => {
        return res.json()
      })
        .then(data => {
          setFood(data)
          console.log(JSON.stringify(data))
        }).catch((error) => {
          alert("Can not find this food !")
        })
    }
    fetchPackageFood()
    fetchAllDishByPackageFood()
    fetchAllSessionPackage()
  }, [])
  const fetchAllSessionPackage = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Session/getallsessionpackage').then(res => (
      res.json()
    )).then(data => (
      setAllProducts(data)
    ))
  }
  const fetchAllDishByPackageFood = () => {
    fetch('https://momkitchen.azurewebsites.net/api/FoodPackage/getalldishbyid?dishid=' + id, {
      method: 'GET'
    }).then(res => res.json()).then((response) => {
      setAllDishInFoodPackage(response)
    })
  }
  const { price, foodPackage, remainQuantity } = food || {}
  const { image, description, foodPackageStyle } = foodPackage || {}
  const title = foodPackage?.name
  // const { title, foodPackageStyleId } = foodPackageStyle || {}
  const [previewImg, setPreviewImg] = useState(image);
  console.log("foodpackagestyle là" + foodPackageStyle?.id)

  console.log(price)
  console.log(description)
  console.log("name là", title)
  const addItem = () => {
    // const { name, defaultPrice, image, description } = foodPackage
    dispatch(
      cartActions.addItem({
        id,
        title,
        image,
        price,
      })
    );
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(enteredName, enteredEmail, reviewMsg);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [product]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [image]);
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const relatedProduct = allProducts?.filter((i) => (
    i.foodPackage?.foodPackageStyleId === foodPackageStyle?.id
  )).splice(0, 4)
  return (
    <Helmet title="Product-details">
      <Header />
      {showCart && <Carts />}
      <CommonSection title="Food details" />
      <section style={{
        backgroundColor: '#F5F5F5'
      }}>
        <Paper style={{
          margin: 20
        }}>
          <Container style={{
            padding: 20,
          }}>
            <Row>
              <Col lg="2" md="2" style={{
                marginRight: -50
              }}>
                <div>
                  {Array.isArray(allDishInFoodPackage) ? (
                    allDishInFoodPackage.map((item, index) => (
                      <div
                        key={index}
                        className="img__item mb-3"
                        onClick={() => setPreviewImg(item.dish.image)}
                      >
                        <img src={item.dish.image} alt="" className="w-50" />
                        <div style={{
                          display: 'flex',
                          marginTop: 5
                        }}>{item.dish.name}</div>
                      </div>
                    ))
                  ) : (
                    // Handle the case when allDishInFoodPackage is not an array
                    // This could include displaying an error message or rendering an alternative UI
                    <div
                      className="img__item mb-3"
                      onClick={() => setPreviewImg(allDishInFoodPackage?.dish?.image)}
                    >
                      <img src={allDishInFoodPackage?.dish?.image} alt="" className="w-50" />
                      <div style={{
                        display: 'flex',
                        marginTop: 5
                      }}>{allDishInFoodPackage?.dish?.name}</div>
                    </div>
                  )}
                </div>
              </Col>
              <Col lg="10" md="10">
                <Space>
                  <img src={image} style={{
                    width: 400,
                    height: 400,
                    borderRadius: 10
                  }}></img>
                  <div className="single__product-content" style={{
                    marginTop: -170
                  }}>
                    <h6 className="product__title mb-3" style={{
                      fontSize: 24
                    }}>{title}</h6>
                    <Space>
                      <p className="product__price">
                        Price: {price} VND
                      </p>
                      <p className="product__price" style={{
                        marginLeft: 20
                      }}>Remain quantity : {remainQuantity} </p>
                    </Space>
                    <p className="category mb-5" style={{
                      fontSize: 25
                    }}>
                      Food style: <Tag style={{
                        padding: 10,
                        fontSize: 20,
                        color: 'green'
                      }}>{foodPackageStyle?.title}</Tag>
                    </p>
                    <button onClick={addItem} className="addTOCart__btn">
                      Add to Cart
                    </button>
                  </div>
                </Space>

              </Col>

              <Col lg="12">
                <div className="tabs d-flex align-items-center gap-5 py-3">
                  <div>
                    <h6
                      className={` ${tab === "desc" ? "tab__active" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h6>
                    <p>
                      <Typography>{description}</Typography>
                    </p>
                  </div>
                  {/* <h6
                    className={` ${tab === "rev" ? "tab__active" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Review
                  </h6> */}
                </div>
                {/* {tab === "desc" ? (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )} */}
              </Col>
              <Col lg="12" className="mb-5 mt-4" style={{
                borderTop: "1px solid #fde4e4"
              }}>
                <h2 className="related__Product-title">You might also like</h2>
              </Col>
              {relatedProduct.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id} >
                  <ProductCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </Paper>
      </section>
      <Footer />
    </Helmet >
  );
};

export default FoodDetails;


        // {/*
        //      <Col lg="4" md="4">
        //       <div className="product__main-img">
        //         {/* <img
        //                   src={foodPackage2.image} alt="" className="w-100" /> */}
        //                   <div>{defaultPrice}</div>
        //                   </div>
        //                 </Col> */}


                      // allDishInFoodPackage.map((item, index) => (
                  //   <div key={index}
                  //     className="img__item mb-3"
                  //     onClick={() => setPreviewImg(item.dish.image)}
                  //   >
                  //     <img src={item.dish.image} alt="" className="w-50" />
                  //     <div style={{
                  //       display: 'flex',
                  //       marginTop: 5
                  //     }}>{item.dish.name}</div>
                  //   </div>
                  // ))