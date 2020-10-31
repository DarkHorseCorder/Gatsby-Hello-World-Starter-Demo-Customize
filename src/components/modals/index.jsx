import React from "react"
import { Link } from "gatsby"

export default function Modals({lang}) {
  return <div id="availability-check-modal" className="popup-modal rounded-lg shadow w-10/12 md:w-1/2" data-popup-modal="availability_check">
    <div className="bg-canfone-teal bg rounded-t-lg text-white">
      <div className="p-3">
        <h2 className="text-2xl font-semibold pt-2 text-center uppercase">
          { (lang === "en") ? "Where you would like Internet service?" : "Où souhaitez-vous un service Internet?"}
        </h2>
        <p className="py-3 px-6 lg:px-24 text-sm text-center">
          { (lang === "en") ? "We ask so that we can provide you with the most up-to-date pricing for your area." : "Nous demandons afin que nous puissions vous fournir les prix les plus à jour pour votre région."}
        </p>
      </div>
    </div>
    <div className="my-4 lg:my-8">
      <form id="AddressForm" className="lg:flex bg-white px-8 pt-6 pb-3 mb-4">
        <input id="city" name="city" type="hidden" />
        <input id="province" name="province" type="hidden" />
        <input id="postal_code" name="postal_code" type="hidden" />
        <div className="mb-4 flex-grow">
          <input
            className="appearance-none border border-grey-800 rounded w-full py-2 px-3 grey-48 leading-tight focus:outline-none focus:shadow-outline"
            id="service_address_input"
            type="text"
            name="service_address_input"
            required=""
            placeholder="Enter your address here"
            autoComplete="off" />
        </div>
        <div className="text-right lg:text-left lg:ml-6">
          <button
            id="SetServiceAddress"
            className="bg-canfone-teal hover:bg-canfone-teal-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            { (lang === "en") ? "Check" : "Consultez"}
          </button>
        </div>
      </form>
      <h4 className="text-sm grey-400 text-center">
        { (lang === "en") ? "If you are an existing customer, login" : "Si vous êtes déjà client, connectez-vous"}
        <Link to="/" className="uppercase text-canfone-red">{ (lang === "en") ? "here" : "ici"}</Link>
      </h4>
    </div>
  </div>
}

