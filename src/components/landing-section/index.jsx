import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck
} from '@fortawesome/free-solid-svg-icons'

export default function LandingSection({ type, section_data }) {
  if(type === 0) {
    return <>
      <h1 className="hidden md:block text-3xl font-semibold text-steel-blue-600 text-center leading-tight">{section_data.main_title[0].text}</h1>
      <h2 className="text-2xl font-light text-steel-blue-400 pt-1 text-center">{section_data.title_desc}</h2>
      <div className="lg:hidden p-3">
        <img alt="" src={section_data.section_hero.url} className="mx-auto border border-grey-400 shadow-2xl" />
      </div>
      <div className="lg:flex w-5/6 mx-auto pt-2">
        <div className="lg:flex-1 px-4 lg:px-8 pt-4 lg:pt-10">
          <h2 className="text-xl font-semibold uppercase text-steel-blue-600">{section_data.sub_title[0].text}</h2>
          <p className="text-base font-normal titlecase text-steel-blue-400 line-height-300 pt-2 lg:pt-4 pb-3">{section_data.section_desc}</p>

          {section_data.section_content.map(({ text }, idx) => (
            <div className="flex content-start pb-1" key={idx}>
              <div className="w-12">
                <div className="text-canfone-teal px-3">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <h4 className="flex-1 text-sm text-steel-blue-400">{text}</h4>
            </div>
          ))}

        </div>
        <div className="hidden lg:block p-8 w-1/2">
          <img alt="" src={section_data.section_hero.url} className="border border-grey-400 shadow-2xl" />
        </div>
      </div>
    </>
  } else {
    return <>
      <h1 className="text-3xl font-semibold text-steel-blue-600 text-center leading-tight">{section_data.main_title[0].text}</h1>
      <h2 className="text-2xl font-light text-steel-blue-400 pt-1 text-center">{section_data.title_desc}</h2>

      <div className="lg:flex w-5/6 mx-auto pt-2">
        <div className="p-3 lg:p-8 lg:w-1/2">
          <img alt="" src={section_data.section_hero.url} className={(type === 2) ? "mx-auto lg:ml-0" : "mx-auto lg:ml-0 border border-grey-400 shadow-2xl" } />
        </div>
        <div className="lg:flex-1 px-4 lg:px-8 pt-4 lg:pt-10">
          <h2 className="text-xl font-semibold uppercase text-steel-blue-600">{section_data.sub_title[0].text}</h2>
          {section_data.section_content.map(({ text }, idx) => {
            if (idx === 0)
              return <p className="text-sm md:text-base font-normal titlecase text-steel-blue-400 line-height-300 pt-2 lg:pt-4" key={idx}>{text}</p>
            else
              return <p className="text-sm md:text-base font-normal titlecase text-steel-blue-400 line-height-300 pt-2" key={idx}>{text}</p>
          }
          )}
        </div>
      </div>
    </>
  } 
}