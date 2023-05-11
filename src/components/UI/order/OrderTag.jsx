import { Paper } from '@material-ui/core'
import { Space, Image } from 'antd'
import React from 'react'
import "../../../styles/orderTag.css"
const OrderTag = ({ props }) => {
  const { id, userName, quantity, image, date, building,title, totalPrice, status, email , phone } = props
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
        }}>{status}</span></div>
      </Space>

      <div>
        <div>Customer Name: {userName}</div>
        <Space>
          <div style={{
            marginBottom:10
          }}>
            <h5>Ordered:</h5>
            <div style={{
              marginLeft:5
            }}>
              <span>{quantity}x</span>
              <Image src={image} style={{
                width: 50,
                height: 50,
                marginLeft:10
              }}></Image>
              <span style={{
                marginLeft:10
              }}>{title}</span>
              <span style={{
                color: 'red',
                marginLeft:10
              }}>Total Price: {totalPrice} VND
              </span>
            </div>
          </div>
        </Space>
        <div>Chef: {email}</div>
        <div>Chef's Phone: {phone}</div>

        <div>Building: {building}</div>
        <div style={{
          color: 'grey'
        }}>Order Date: {date}</div>
      </div>
    </Paper>
  )
}

export default OrderTag