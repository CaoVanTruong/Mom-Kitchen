import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PaypalCheckout = (props) => {
    const [error, setError] = useState(null)

    const { price } = props;
    const [paidFor, setPaidFor] = useState(false)
    const navigate = useNavigate();
    const handleApprove = (orderId) => {
        //call backend function to fulfill order
        // if (price === 0) {
        //     alert("You have to choose food you want to buy first")
        // } else {
       
        // }
        navigate('/home')
        // setPaidFor(true)
        alert("Thank you for your purchase")
    };
    const onCancel = () => {
        alert("Payment canceled.")
    }
    if (paidFor) {
        setPaidFor(false)
    }
    // if (error) {
    //     // alert("You want to choose food you want to buy first")
    //     if (price === 0) {
    //         alert("You have to choose food you want to buy first")
    //     } else {
    //         console.log("")
    //     }
    // }
    return (
        <div style={{
            marginTop: 10,
            marginLeft: 250
        }}>
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
                    // onError={(error) => {
                    //     if(price === 0){
                    //         setError("You have to choose food you want to buy first")
                    //     }else{
                    //         setError("")
                    //     }

                    // }}
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