import React, { useState } from 'react'
import Navbar from '../../components/Sidebar/Navbar'
import '../../styles/userManagement.css'
import DataTable from 'react-data-table-component'
import { padding } from '@mui/system'
import { blue } from '@mui/material/colors'
import zIndex from '@mui/material/styles/zIndex'
import { Link } from 'react-router-dom'
const UserManagement = () => {
  const columns = [
    {
      selector: row =>
        <span>{row.id}</span>,
      style: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Image</span>,
      selector: row => <img style={{
        width: 70,
        height: 50
      }} src={row.image}></img>,
      style: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Chef</span>,
      selector: row => row.chef,
      style: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Price</span>,
      selector:
        row =>
          <span>{row.price}</span>,
      style: {
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Action</span>,
      selector: row =>
        <span className='action__icons'>
          <Link to='#'>
            < i class="ri-edit-line"></i >
          </Link>
          <Link to='#'>
            <i class="ri-delete-bin-6-line">
            </i>
          </Link>
        </span>
      // <span></span>
    },

  ]
  const userData = [
    {
      id: 3,
      name: "Package of food",
      chef: "email@gmail.com",
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      price: 35000
    },
    {
      id: 3,
      name: "Package of food",
      chef: "email@gmail.com",
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      price: 35000
    },
    {
      id: 3,
      name: "Package of food",
      chef: "email@gmail.com",
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      price: 35000
    },
    {
      id: 3,
      name: "Package of food",
      chef: "email@gmail.com",
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      price: 35000
    },
  ]
  const [records, setRecords] = useState(userData)
  function handleFilter(event) {
    const newData = userData.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }
  return (
    <div className='background__admin' >
      <Navbar />
      <div className='container__admin' style={{
        backgroundColor: '#F0F1F6'
      }}>
        <div className='main'>
          <div className='title__userM mb-5'>
            <h5>Food management</h5>
          </div>
          <div className='toolbar__admin'>
            <div className='addUser__btn'>
              <button>
                New Food
              </button>
            </div>
            <div className='searchWithIcon'>
              <input type='text-end' onChange={handleFilter} placeholder='Search...' style={{
                borderWidth: 1,
                padding: 5,
                borderRadius: 10,
                marginBottom: 20,
                paddingLeft: 5,
              }}>
              </input>
              <i class="ri-search-line"></i>
            </div>
          </div>
          <DataTable
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: '#FFA500'
                }
              },
            }}
            withBorder
            borderRadius='sm'
            columns={columns}
            data={records}
            fixedHeader
            pagination
          >
          </DataTable>
        </div>
      </div>
    </div >
  )
}

export default UserManagement