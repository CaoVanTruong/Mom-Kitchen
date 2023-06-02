import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Toast } from "bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PaypalCheckout = (props) => {
    const { price, email, note, building, phone} = props;
    console.log("building truyền qua là",building)
    console.log("phone truyền vào là",phone)
    const [error, setError] = useState(null)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => state.cart.cartItems)

    const [paidFor, setPaidFor] = useState(false)
    const navigate = useNavigate();
    const noteRedux = useSelector((state)=>state.cart.note)
    const session = cartItems[0]?.sessionId
    console.log("building change là",localStorage.getItem('building'))
    console.log("phone change là",localStorage.getItem('phone'))
    const handleApprove = () => {
        fetch('https://momkitchen.azurewebsites.net/api/Order', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                buildingId: localStorage.getItem('building'),
                sessionId: session,
                email: email,
                note: localStorage.getItem('note'),
                phone:localStorage.getItem('phone'),
                orderDetails:
                    cartItems.map((item) => {
                        return {
                            "sessionPackageId": item.id,
                            "price": item.price,
                            "quantity": item.quantity
                        }
                    })
                ,
                payments: [
                    {
                        amount: totalAmount
                    }
                ]
            })
        }).catch((error) => {
            console.log("Lỗi tạo order là", error)
        })
        navigate('/home')
        alert("Thank you for your purchase")
    };
    const onCancel = () => {
        alert("Payment canceled.")
    }
    if (paidFor) {
        setPaidFor(false)
    }
    if (error) {
        alert(error)
    }
    return (
        <div style={{ width: "500px" }}>
            <PayPalScriptProvider options={{ "client-id": "ATH4YbNWCU7Ya8mr8jB34vDGjq1_w24Lx3FyAQ_XYWvYGsXMvqxQ8fnC669qNkpRpHZo2zQLjyjGykWl" }}
            >
                <PayPalButtons style={{
                    color: "gold",
                }}
                onInit={()=>{console.log("note trong onInit",note)}}
                onClick={()=>{
                    console.log("note trong onClick",note)
                }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: price,
                                    },
                                },
                            ],
                            application_context: {
                                shipping_preference: "NO_SHIPPING",
                            },
                        })
                    }}
                    onApprove={ (data, actions) => {
                        const order = actions.order.capture();
                        handleApprove()
                    }}
                    onCancel={() => {
                        // setError("Transaction canceled")
                        onCancel()
                    }}
                    onError={(error) => {
                        if (price === 0) {
                            setError("You have to choose food you want to buy first")
                        } else {
                            setError(error)
                        }

                    }}
                >

                </PayPalButtons>
            </PayPalScriptProvider>

        </div>
    )
}
export default PaypalCheckout

        // console.log('nghe vô lý quá',totalQuantity)
        // console.log("redux note trong hanlde approve là",JSON.stringify(noteRedux))
        // console.log("console in ra body fetch",JSON.stringify({
        //     buildingId: building,
        //     sessionId: session, 
        //     email: email,
        //     note:noteRedux,
        //     orderDetails:
        //         cartItems.map((item) => {
        //             return {
        //                 "sessionPackageId": item.id,
        //                 "price": item.price,
        //                 "quantity": item.quantity
        //             }
        //         })
        //     ,
        //     payments: [
        //         {
        //             amount: totalAmount
        //         }
        //     ]
        // }))