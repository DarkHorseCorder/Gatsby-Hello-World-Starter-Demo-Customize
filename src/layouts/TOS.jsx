import React from "react"

export default function TOS({ data }) {
  return <div className="pt-20 md:pt-32 px-8">
    {data.map((item, idx) => {
      switch (item.tos_content.raw[0].type) {
        case "heading1":
        case "heading2":
          return <h2 className="text-3xl font-semibld text-center pb-6" key={idx}>{item.tos_content.raw[0].text}</h2>
        case "paragraph":
          return <p className="py-2" key={idx}>{item.tos_content.raw[0].text}</p>
        case "heading3":
        case "heading6":
          return <p className="py-2" key={idx}><strong>{item.tos_content.raw[0].text}</strong></p>
        default:
          return <div key={idx}></div>;
      }
    })}
  </div>
}