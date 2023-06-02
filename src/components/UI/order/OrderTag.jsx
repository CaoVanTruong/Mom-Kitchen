import { Paper } from '@material-ui/core'
import { Space, Image } from 'antd'
import React from 'react'
import "../../../styles/orderTag.css"
import { useState } from 'react'
import { useEffect } from 'react'
const OrderTag = ({ props }) => {
  const [foodPackage, setFoodPackage] = useState([])
  const { id, userName, quantity, date, buildingId, title, totalPrice, status, customer , deliveryStatus } = props
  console.log("id là", id)
  useEffect(() => {
    fetchFoodPackageByOrderId()
  }, [])
  const fetchFoodPackageByOrderId = () => {
    fetch('https://momkitchen.azurewebsites.net/api/Order/getsessionpackagebyorderid?orderid=' + id).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      setFoodPackage(data)
    })
  }
    const {name} = customer || {}
  console.log(foodPackage)
  return (
    <Paper className='OrderTag'
    >
      <Space style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div style={{
          fontStyle: 'italic'
        }}>Order ID: {id}</div>
        <div style={{
          fontStyle: 'italic'
        }}> Status: <span style={{
          color: 'red'
        }}>{deliveryStatus}</span></div>
      </Space>

      <div>
        <div>Customer Name: {name}</div>

        <Space>
          <div style={{
            marginBottom: 10
          }}>
            <h5>Ordered:</h5>
            <div style={{
              marginLeft: 5
            }}>
              <span>Quantity: {quantity}</span>
              {
                foodPackage.map((i) => (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 10

                    }}>
                      <span>
                        <Image src={i?.foodPackage?.image} style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                        }}></Image>
                      </span>
                      <span style={{
                        fontSize: 24,
                        color: 'red',
                        marginLeft: 20
                      }}>{i.foodPackage.name}</span>
                    </div>
                  </div>
                ))
              }
              <span>{title}</span>
              <span style={{
                color: 'red',
                fontSize: 20
              }}>Total Price: {totalPrice} VND
              </span>
            </div>
          </div>
        </Space>
        <div>Building: {buildingId}</div>
        <div style={{
          color: 'grey'
        }}>Order Date: {date}</div>
      </div>
    </Paper>
  )
}

export default OrderTag