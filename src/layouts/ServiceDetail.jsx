import ShopComponent from "components/shop"
import React from "react"
import FAChat from "../components/fa-chat"

export default function ServiceDetail({lang}) {
  return <>
    <div className="header-service-details">
      <div className="ml-4 md:ml-20 pt-40 md:pt-16">
        <h1 className="text-2xl md:text-4xl font-light">{ (lang === "en") ? "Service Details" : "Détails des services"}</h1>
        <h1 className="text-base md:text-2xl font-light mt-3">{ (lang === "en") ? "We're Almost Done!" : "Nous avons presque terminé!"}</h1>
      </div>
      <div className="ml-4 md:ml-20 pt-8">
        <h4 className="text-base md:text-2xl font-light md:w-1/2">
        { (lang === "en") ? "Let's confirm a few service details before submitting your order." : "Confirmez quelques détails de service avant de soumettre votre commande."}
      </h4>
      </div>
    </div>

    <FAChat lang={lang} />
    <div id="shop_component" className="hidden">
      <ShopComponent lang={lang}/>
    </div>
    <div id="shop" className="my-8">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  </>
}

