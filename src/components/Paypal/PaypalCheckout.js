import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { Toast } from "bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PaypalCheckout = (props) => {
    const { price, email, note, building, phone } = props;
    const [error, setError] = useState(null)
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const [paidFor, setPaidFor] = useState(false)
    const navigate = useNavigate();
    // console.log("Email ben paypal là" + email)
    // console.log("Note hiện tại là " + note)
    // console.log("Building hiện tại là" + building)
    // console.log(JSON.stringify(cartItems))
    // console.log("Cart item chứa ",JSON.stringify(cartItems[0]?.sessionId))
    const session = cartItems[0]?.sessionId
    // console.log(session)
    console.log("cart item hiện tại là" + JSON.stringify(cartItems))
    console.log("so luong 1 là" + cartItems[0].quantity + "so luong 2 là" + cartItems[1].quantity)
    console.log("TOtal quantity là" + totalQuantity)
    const handleApprove = () => {
        fetch('https://momkitchen.azurewebsites.net/api/Order', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                buildingId: building,
                sessionId: session,
                email: email,
                totalPrice:totalAmount,
                quantity: totalQuantity,
                note: note,
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
        // setPaidFor(true)
        alert("Thank you for your purchase")
        // Toast("Than")
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
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        handleApprove(order.id)
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

// import { useEffect } from "react";
// import {
//     PayPalScriptProvider,
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";

// // This values are the props in the UI
// const amount = "2";
// const currency = "USD";
// const style = { "layout": "vertical" };

// // Custom component to wrap the PayPalButtons and handle currency changes
// const ButtonWrapper = ({ currency, showSpinner }) => {
//     // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
//     // This is the main reason to wrap the PayPalButtons in a new component
//     const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

//     useEffect(() => {
//         dispatch({
//             type: "resetOptions",
//             value: {
//                 ...options,
//                 currency: currency,
//             },
//         });
//     }, [currency, showSpinner]);


//     return (<>
//         {(showSpinner && isPending) && <div className="spinner" />}
//         <PayPalButtons
//             style={style}
//             disabled={false}
//             forceReRender={[amount, currency, style]}
//             fundingSource={undefined}
//             createOrder={(data, actions) => {
//                 return actions.order
//                     .create({
//                         purchase_units: [
//                             {
//                                 amount: {
//                                     currency_code: currency,
//                                     value: amount,
//                                 },
//                             },
//                         ],
//                         application_context: {
//                             shipping_preference: "NO_SHIPPING",
//                         },
//                     })
//                     .then((orderId) => {
//                         // Your code here after create the order
//                         return orderId;
//                     });
//             }}
//             onApprove={function (data, actions) {
//                 return actions.order.capture().then(function () {
//                     // Your code here after capture the order
//                 });
//             }}
//             onError={(error)=>{
//                 console.log("")
//             }}
//         />
//     </>
//     );
// }

// export default function PaypalCheckout() {
//     return (
//         <div style={{ maxWidth: "750px", minHeight: "200px" }}>
//             <PayPalScriptProvider
//                 options={{
//                     "client-id": "ATH4YbNWCU7Ya8mr8jB34vDGjq1_w24Lx3FyAQ_XYWvYGsXMvqxQ8fnC669qNkpRpHZo2zQLjyjGykWl",
//                     components: "buttons",
//                     currency: "USD"
//                 }}
//             >
//                 <ButtonWrapper
//                     currency={currency}
//                     showSpinner={false}
//                 />
//             </PayPalScriptProvider>
//         </div>
//     );
// }