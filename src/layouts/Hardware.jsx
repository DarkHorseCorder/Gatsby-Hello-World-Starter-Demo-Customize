import React from "react"
import CanMap from "../components/canfone-map"
import FAChat from "../components/fa-chat"
import PageHeader from "../components/page-header"

export default function Hardware({intro, lang}) {
  return <>
    <div className="header-hardware">
      <PageHeader 
        title2={intro.intro_title[0].text}
        title3={intro.intro_subtitle[0].text}
        serviceType={ (lang === "en") ? "Monthly plans starting from" : "Plans mensuels à partir de"}
        price={"$" + intro.start_price}
        />
    </div>
    
    <FAChat lang={lang}/>
    <CanMap lang={lang}/>
  </>
}