import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarker
} from '@fortawesome/free-solid-svg-icons'

import FAChat from "../components/fa-chat"
import PageHeader from "../components/page-header"
import ShopComponent from "components/shop"
import LandingSection from "components/landing-section"

export default function Internet({intro, section, lang}) {
  return <>
    <div className="header-internet">
      <PageHeader
        title1="Internet Packages"
        title2={intro.intro_title[0].text}
        title3={intro.intro_subtitle[0].text}
        serviceType={ (lang === "en") ? "Monthly plans starting from" : "Plans mensuels à partir de"}
        price={"$" + intro.start_price}
        />
      <div className="ml-4 md:ml-20 pt-1">
        <Link className="text-orange-500 underline" to="/">{ (lang === "en") ? "View Plans" : "Voir les plans"}</Link>
      </div>
    </div>
    <FAChat  lang={lang}/>
    <div className="w-4/5 mx-auto my-6 mb-5 border border-gray-800 bg-white rounded">
      <h3 className="text-base p-2 text-white bg-canfone-grey">{ (lang === "en") ? "Showing service availability for:" : "Montrer la disponibilité du service pour:"}Showing service availability for:</h3>
      <div className="flex border-t border-gray-400 py-2 w-full">
        <div className="pt-1 px-3 text-2xl text-canfone-red">
          <FontAwesomeIcon icon={faMapMarker} className="mr-2"/>
        </div>
        <div className="flex-1 pt-2 "><h3 id="service-address" className="text-sm md:text-xl"> </h3></div>
        <div className="px-4">
          <button
            type="button"
            className="lg:hidden modal-popup-trigger mt-2 barlow-button-grey px-2 py-1 rounded"
            data-popup-trigger="availability_check">
            { (lang === "en") ? "Change" : "Changer"}
          </button>
        </div>
        <div className="hidden lg:block px-4 mt-1">
          <button
            type="button"
            className="modal-popup-trigger barlow-button-grey px-2 md:px-3 py-1 rounded"
            data-popup-trigger="availability_check">
            { (lang === "en") ? "Change Location" : "Changer de lieu"}
          </button>
        </div>
      </div>
    </div>

    <div id="shop_component" className="hidden">
      <ShopComponent lang={lang}/>
    </div>

    <div id="shop">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div> 

    <div className="px-8 pt-16 pb-24">
      <LandingSection type={2} section_data={section[0]} />
    </div>
  </>
}