import React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faComment
} from '@fortawesome/free-solid-svg-icons'

export default function FAChat({lang}) {
  return <>
    <div className="md:hidden flex items-end bg-canfone-red py-5">
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl ml-4 mr-6 md:ml-20 text-white font-light">
          { (lang === "en") ? "Get Canfone Now." : "Obtenez Canfone maintenant."}
        </h2>
        <h2 className="flex-1 text-xl md:text-2xl ml-4 mr-6 md:ml-20 text-white font-bold">{ (lang === "en") ? "Call" : "Appelez"} 1-866-857-3140</h2>
      </div>
      <button className="barlow-button-grey text-white mr-4 h-10  md:mr-12 py-1 px-3 md:px-4 rounded-full">
        <FontAwesomeIcon icon={faComment} className="mr-2" />{ (lang === "en") ? "Chat" : "Bavarder"} 
      </button>
    </div>

    <div className="hidden md:flex bg-canfone-red py-5">
      <h2 className="flex-1 text-xl md:text-2xl ml-4 mr-6 md:ml-20 text-white font-light">Get Canfone Now. <span className="font-bold">{ (lang === "en") ? "Call" : "Appelez"} 1-866-857-3140</span></h2>
      <button className="barlow-button-grey text-white mr-4 md:mr-12 py-1 px-3 md:px-4 rounded-full">
        <FontAwesomeIcon icon={faComment} className="mr-2" />{ (lang === "en") ? "Chat" : "Bavarder"} 
      </button>
    </div>

    <p style={{ position: "relative" }}>
      <Link name="modify" style={{ position: "absolute", top: "-85px" }} to="#"> </Link>
    </p>
  </>
}