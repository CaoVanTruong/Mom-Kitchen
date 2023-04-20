import { Paper } from '@material-ui/core'
import { Space } from 'antd'
import React from 'react'
import "../../../styles/orderTag.css"
import { Link } from 'react-router-dom'
const OrderTag = ({ props }) => {
  const { id, userName, date, totalPrice, status } = props
  return (
    <Paper className='OrderTag'
    >
      {/* <Link to="/orderDetail"> */}
        {/* <Paper> */}
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
        <div>Customer Name: {userName}</div>
        <div>Order Date: {date}</div>
        <div>Total Price: {totalPrice} VND</div>

        {/* </Paper> */}
      {/* </Link> */}
    </Paper>
  )
}

export default OrderTag