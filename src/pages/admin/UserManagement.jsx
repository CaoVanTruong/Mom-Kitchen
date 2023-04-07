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
      name:
        <span>ID</span>,
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
      name: <span>Name</span>,
      selector: row => row.name,
      style: {

        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Email</span>,
      selector: row => row.email,
      style: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#B2F8FF',

        },
      },
    },
    {
      name: <span>Role</span>,
      selector:
        row =>
          <span>{row.role}</span>,
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
      id: 1,
      name: "Doctor Strange",
      email: "email@gmail.com",
      role: "Chef"
    },
    {
      id: 2,
      name: "Robin Hood",
      email: "email@gmail.com",
      role: "Shipper"

    },
    {
      id: 3,
      name: "Dr Fate",
      email: "email@gmail.com",
      role: "Customer"

    },
    {
      id: 4,
      name: "Shazam",
      email: "email@gmail.com",
      role: "Chef"

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
            <h5>User management</h5>
          </div>
          <div className='toolbar__admin'>
            <div className='addUser__btn'>
              <button>
                New user
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