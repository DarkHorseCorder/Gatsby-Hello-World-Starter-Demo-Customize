import React from "react"

export default function PageHeader({title1, title2, title3, serviceType, price}) {
  return <>
    <div className="ml-4 md:ml-20 pt-32 md:pt-16">
      {/* <h1 className="text-2xl font-light">{title1}</h1> */}
      <h1 className="sm:block text-4xl font-light">{title2}</h1>
      <h1 className="text-base sm:text-2xl font-light mt-3">{title3}</h1>
    </div>
    <div className="ml-4 md:ml-20 pt-8">
      <h4 className="text-sm">{serviceType}</h4>
      <h1 className="font-semibold leading-tight text-2xl md:text-6xl">{price}<span className="text-xl">/MO</span></h1>
    </div>
  </>
}