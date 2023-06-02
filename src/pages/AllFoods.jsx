import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import { Box, MenuItem, Select, FormControl, Menu } from '@mui/material'
import { getAllSessionPackage } from "../API/user/userAPI.jsx";

import "../styles/all-foods.css";
import "../styles/pagination.css";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Carts from "../components/UI/cart/Carts.jsx";
import { useSelector } from "react-redux";
import { e, filter } from "mathjs";
const AllFoods = () => {
  const productTemplate = [
    {

    }
  ]
  const cartItem = useSelector((state) => state.cart.cartItems)
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [productList, setProductList] = useState([])
  const [filterValue, setFilterValue] = useState("Default")
  const chefValueId = cartItem.map((i) => i.chef)[0];
  useEffect(() => {
    if (getAllSessionPackage) {
      getAllSessionPackage().then(response => {
        setAllProducts(response)
        setProductList(response)
      })
    } else {
      alert("Something went wrong at loading ! Try again")
    }
  }, [])
  console.log("all product là", allProducts)
  const filteredArray = chefValueId ? allProducts.filter((item) => item.foodPackage?.chefId === chefValueId) : [];

  const searchedProduct = allProducts.filter((item) => {
    const name = item.foodPackage?.name
    if (name?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
    // alert(item.foodPackage.name)
  });
  useEffect(() => {
    const data = filterValue
    console.log(data)
    if (filterValue === "Lowest price") {
      const lowestPriceGoods = allProducts.sort((a, b) => a.price - b.price);
      console.log("Vao dc lowest")
      setAllProducts([...lowestPriceGoods]);
    }
    if (filterValue === "Highest price") {
      const highestPriceGoods = allProducts.sort((a, b) => b.price - a.price);
      console.log("Vao dc highest")
      setAllProducts([...highestPriceGoods]);
    }
    // if (filterValue === "Default") {
    //   console.log("Vao dc default")
    //   async function getAllFood() {
    //     try {
    //       const requestUrl = 'https://momkitchen.azurewebsites.net/api/FoodPackage'
    //       const response = await fetch(requestUrl)
    //       const responseJSON = await response.json()
    //       const newFood = responseJSON
    //       setAllProducts(newFood)
    //     } catch (error) {
    //       console.log("Failed", error.message)
    //     }
    //   }
    //   getAllFood();
    // }
  }, [filterValue])
  // const filterDropdown = () => {
  //   // setFilterValue(e.target.value)
  //   console.log(filterValue)
  //   if (filterValue === "Lowest price") {
  //     const lowestPriceGoods = allProducts.sort((a, b) => b.price - a.price);
  //     console.log("Vao dc lowest")
  //     setAllProducts([...lowestPriceGoods]);
  //   }
  //   if (filterValue === "Highest price") {
  //     const highestPriceGoods = allProducts.sort((a, b) => a.price - b.price);
  //     console.log("Vao dc highest")
  //     setAllProducts([...highestPriceGoods]);
  //   }
  //   if (filterValue === "Default") {
  //     setAllProducts(allProducts);
  //   }
  // }
  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );
  const pageCount = Math.ceil(searchedProduct.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (

    <Helmet title="All-Foods">
      <Header />
      {showCart && <Carts />}
      <CommonSection title="All Foods" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between " style={{ height: 55, border: "1px solid black" }}>
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  defaultValue=""
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              {/* <div className="sorting__widget text-end" onChange={(e) => filterDropdown(e)}>
                <select className="w-50">
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl style={{ width: 300 }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    EditOutlined='none'
                  >
                    <MenuItem value="Default">Default</MenuItem>
                    <MenuItem value="Highest price">Highest price</MenuItem>
                    <MenuItem value="Lowest price">Lowest price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Col>
            {
              (chefValueId == "" || chefValueId == null) ?
                displayPage.filter((item) => item.remainQuantity > 0).map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                    <ProductCard item={item} />
                  </Col>
                )) : filteredArray.filter((item) => item.remainQuantity > 0).map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mt-5">
                    <ProductCard item={item} />
                  </Col>
                ))
            }
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  );
};

export default AllFoods;
