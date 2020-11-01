import React from "react"

export default function OrderConfirmation({lang}) {
  return <>
    <div className="pt-20 md:pt-32 px-8">
      <h1 className="text-4xl font-semibold grey-700 text-center pt-20 pb-12">Thanks for your order!</h1>
      <h2 className="text-xl text-center grey-700 pt-16">Your order reference is <span id="order_reference"></span></h2>
      <h2 className="text-xl mx-auto text-center grey-700 w-3/5 pt-16 px-12 pb-24">We'll be in touch as your order begins it's fulfillment journey, welcome to Canfone!</h2>
    </div>
  </>
}