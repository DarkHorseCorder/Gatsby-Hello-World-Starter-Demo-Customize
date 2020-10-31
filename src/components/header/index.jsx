import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList
} from '@fortawesome/free-solid-svg-icons'

import { GATSBY_IMGS } from "utils/imgloader"

export default function Header({ children, title, lang }) {
  let lang_route = (lang === "en") ? "" : "/fr"
  return <>
    <nav id="Header" className="flex header-large px-3 flex text-white">
      <div className="ml-1 md:ml-4">
        <a href={ lang_route + "/"}><img id="Logo" className="hidden lg:block header-logo-large" src={GATSBY_IMGS["img/logo_120.png"]} alt="logo" /></a>
        <a href={ lang_route + "/"}><img id="Logo" className="lg:hidden header-logo-small" src={GATSBY_IMGS["img/logo_120.png"]} alt="logo" /></a>
      </div>
      <div className="flex-grow text-right">
        <div className="inline-block lg:hidden text-right mt-5 mr-3">
          <button
            id="MobileMenuBtn"
            className="flex items-center px-2 py-1 border rounded text-white text-base border-gray-100 hover:text-canfone-red-light 
        hover:border-canfone-red-light">
            <FontAwesomeIcon icon={faList} />
          </button>
        </div>
        <div id="ResBus" className="hidden lg:block text-right ml-5">
          <span className="text-xl font-semibold text-canfone-red inline-block px-4 py-1">1-866-857-3140</span>
          <span id="BusinessLink" className="business_package cursor-pointer inline-block ml-8 mr-4 py-1">{ (lang === "en") ? "Business" : "Affaires"}</span>
          <span id="ResidentialLink" className="residential_package cursor-pointer inline-block mr-6 py-1">{ (lang === "en") ? "Residential" : "Résidentiel"}</span>
          <a href={ (lang === "en") ? "/fr/":"/"} id="lang-fr" className="lang ml-4 mr-5 font-semibold">{ (lang === "en") ? "FR" : "EN"}</a>
        </div>
        <div id="Menu" className="hidden w-full lg:flex lg:items-center lg:w-auto">
          <div id="NavLinks" className="top-nav nav-links-large flex justify-end lg:flex-grow">
            <a href={ lang_route + "/internet"} className="next-page-link top-nav-inactive uppercase block mx-5 lg:inline-block lg:mt-0 text-gray-100 cursor-pointer" data-next-page="internet">{ (lang === "en") ? "Internet":"L'Internet"}</a>
            <a href={ lang_route + "/tv"} className="next-page-link top-nav-inactive uppercase block mx-5 lg:inline-block lg:mt-0 text-gray-100 cursor-pointer" data-next-page="tv">{(lang === "en") ? "TV":"La Télé"}</a>
            <a href={ lang_route + "/phone"} className="next-page-link top-nav-inactive uppercase block mx-5 lg:inline-block lg:mt-0 text-gray-100 cursor-pointer" data-next-page="phone">{(lang === "en") ? "Phone" : "Téléphone"}</a>
            <a href={ lang_route + "/account"} className="next-page-link top-nav-inactive uppercase block mx-5 lg:inline-block lg:mt-0 text-gray-100 cursor-pointer" data-next-page="account">{(lang === "en") ? "Account" : "Compte"}</a>
          </div>
        </div>
      </div>
    </nav>
    <div id="MobileMenu" className="hidden mobile-menu w-full lg:hidden">
      <div className="my-3 text-center">
        <div className="mb-5">
          <button className="bg-canfone-red border border-canfone-red text-white font-bold py-2 px-4 mr-6 rounded">
            {"Residential"}
          </button>
          <button className="border border-gray-100 text-white font-bold py-2 px-4 rounded">
            {"Business"}
          </button>
        </div>
        <a href={ lang_route + "/internet"} className="next-page-link block border-t border-grey-500 py-3 uppercase text-gray-100 cursor-pointer" data-next-page="internet">{ (lang === "en") ? "Internet":"L'Internet"}</a>
        <a href={ lang_route + "/tv"} className="next-page-link block border-t border-grey-500 py-3 uppercase text-gray-100 cursor-pointer" data-next-page="tv">{(lang === "en") ? "TV":"La Télé"}</a>
        <a href={ lang_route + "/phone"} className="next-page-link block border-t border-grey-500 py-3 uppercase text-gray-100 cursor-pointer" data-next-page="phone">{(lang === "en") ? "Phone" : "Téléphone"}</a>
        <a href={ lang_route + "/account"} className="next-page-link block border-t border-grey-500 py-3 uppercase text-gray-100 cursor-pointer" data-next-page="account">{(lang === "en") ? "Account" : "Compte"}</a>
      </div>
    </div>

    {/* Body Overlay for Modals */}
    <div className="body-blackout"></div>
  </>
}

