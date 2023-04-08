import React, { useState } from 'react'
import Navbar from '../../components/Sidebar/Navbar'
import '../../styles/userManagement.css'
import DataTable from 'react-data-table-component'
import { padding } from '@mui/system'
import { blue, yellow } from '@mui/material/colors'
import zIndex from '@mui/material/styles/zIndex'
import { Link } from 'react-router-dom'
const UserManagement = () => {
  const columns = [
    {
      name:
        <h6>ID</h6>,
      selector: row =>
        row.id,
    },
    {
      name: <h6>Name</h6>,
      selector: row => row.name,
    },
    {
      name: <h6>Email</h6>,
      selector: row => row.email,
    },
    {
      name: <h6>Role</h6>,
      selector:
        row =>
          row.role,
      style: {
        width: '50',
      },
    },
    {
      selector: row =>
        <div className='action__icons' style={{
          display: 'flex',
          justifyContent: 'center',
          width: 100,
          alignItems: 'center',
        }}>
          <Link to='#'>
            <span>
              < i class="ri-edit-line" style={{
                fontSize: 20,
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1px solid purple',
                marginBottom: 20,
                borderRadius: 20,
                color: 'purple',
              }}></i >
            </span>
          </Link>
          <Link to='#'>
            <span>
              <i class="ri-delete-bin-6-line" style={{
                fontSize: 20,
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1px solid purple',
                marginBottom: 20,
                borderRadius: 20,
                color: 'purple',
                marginLeft:20,
              }}>  </i>
            </span>

          </Link>
        </div >
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
              rows: {
                style: {
                  cursor: 'pointer',
                  ":hover": {
                    backgroundColor: '#F6F8FA'
                  }
                },
              }
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