import ShopComponent from "components/shop"
import React from "react"

export default function OrderReview({lang}) {
  return <>
    <div id="shop_component" className="hidden">
      <ShopComponent lang={lang}/>
    </div>
    <div id="shop" className="order-review my-8">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  </>
}


