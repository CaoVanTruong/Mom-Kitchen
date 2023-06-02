import { useState } from 'react'
import { Paper } from '@mui/material'
import { Button, Image, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../UploadImage/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { render } from 'react-dom'
import { PictureOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, UserOutlined, ShoppingCartOutlined, SolutionOutlined, LogoutOutlined, IdcardOutlined, ApartmentOutlined } from '@ant-design/icons'
const UserSideBar = () => {
    const [imageUpload, setImageUpload] = useState(null)
    const [Url, setUrl] = useState(null)
    const [data, setData] = useState({})
    const [defaultImage, setDefaultImage] = useState("")
    const navigate = useNavigate()
    const uploadImage = async () => {
        if (imageUpload == null) return;
        setUrl('Getting Url Link...')
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload).then(() => {
            alert("Image Uploaded")
        })
        await getDownloadURL(imageRef).then((x) => {
            setUrl(x)
        })
        console.log("URL là:" + Url)
    }
    // const handlePreviewAvatar = (e) => {
    //     const file = e.target.files[0]
    //     // file.preview = URL.createObjectURL(file)
    // }
    useEffect(() => {
        uploadImage()
    }, [imageUpload])
    useEffect(() => {
        fetch('https://momkitchen.azurewebsites.net/api/Account/getallcustomerbyemail?email=' + localStorage.getItem('user-infor' || ""), {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])
    const { image } = data
    console.log(image)
    const menuItem = [
        {
            key: '/profile',
            label: "Your information",
            icon: <AppstoreOutlined />
        },
        {
            key: '/history',
            label: "Order history",
            icon: <ShoppingCartOutlined />
        },
        {
            key: '/home',
            label: 'Log out',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ]
    return (
        <Paper style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginRight: 10,
            height: 480
        }}>
            <div>
                <form className='chooseImageForm' style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: "2px dashed #1475cf",
                    height: 150,
                    width: 150,
                    cursor: 'pointer',
                    borderRadius: 5,
                    marginTop: -150,
                    borderRadius: 10
                }}
                    onClick={() => document.querySelector(".input-field").click()}
                >
                    <input type='file' style={{
                        fontSize: 10,
                        marginLeft: 50
                    }}
                        className='input-field'
                        hidden
                        value={defaultImage}
                        onChange={(event) => {
                            {
                                setImageUpload(event.target.files[0])
                                // handlePreviewAvatar(event)
                            }
                        }
                        }
                    ></input>
                    {
                        uploadImage ? <img src={Url ? Url : image} style={{
                            width: 140,
                            height: 140,
                            borderRadius: 10
                        }}></img> : <PictureOutlined size={120} />
                    }
                </form>
            </div>
            {/* <div className='userProfile'>
                <div className='userProfile_Item'>
                    <i class="ri-account-circle-line"></i>
                    <Link to='/profile'><p>Your information</p></Link>
                </div>
                <div className='userProfile_Item'>
                    <i class="ri-article-line"></i>
                    <Link to='/history'><p>Order history</p></Link>
                </div>
                <div className='userProfile_Item'>
                    <i class="ri-logout-circle-line"></i>
                    <Link to='/home' onClick={() => localStorage.clear()}><p>Log out</p></Link>
                </div>
            </div> */}
            <div>
                <Menu
                style={{
                    marginTop:10,
                    textDecoration:'none'
                }}
                    mode='vertical'
                    onClick={(item) => {
                        navigate(item.key)
                        if (item.key === '/home') {
                            localStorage.clear()
                        }
                    }}
                    items={
                        menuItem
                    }
                >
                    <div style={{
                        borderBottomColor: 'black'
                    }}>menuItem</div>
                </Menu>
            </div>
        </Paper >

    )
}

export default UserSideBar