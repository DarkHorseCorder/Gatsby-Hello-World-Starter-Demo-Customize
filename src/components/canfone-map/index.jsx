import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarker
} from '@fortawesome/free-solid-svg-icons'
import ShopComponent from "components/shop"

export default function CanMap({lang}) {
  return <>
    <div className="w-4/5 mx-auto my-6 mb-8 border border-gray-800">
      <h3 className="text-base p-2 text-white bg-canfone-grey">
        { (lang === "en") ? "Showing service availability for: " : "Indiquer la disponibilité du service pour:"}
      </h3>
      <div className="flex border-t border-gray-400 py-2 w-full">
        <div className="flex-grow-0 pt-1 px-3 text-2xl text-canfone-red">
          <FontAwesomeIcon icon={faMapMarker} />
        </div>
        <div className="flex-grow pt-2 "><h3 id="service-address" className="text-sm md:text-xl"> </h3></div>
        <div className="flex-grow-0 px-4">
          <button
            type="button"
            className="sm:hidden modal-popup-trigger mt-2 barlow-button-grey px-2 py-1 rounded"
            data-popup-trigger="availability_check">
            { (lang === "en") ? "Change" : "Changer"}
          </button>
        </div>
        <div className="hidden sm:block flex-grow-0 px-4 mt-1">
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
  </>
}