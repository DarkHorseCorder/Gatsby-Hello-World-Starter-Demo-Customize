import React from "react"
import {
  Img__canfone_logo_white
} from "../utils/imgloader"

export default function Account({lang}) {
  const login = () => {
    console.log("Login clicked!");
  }
  return <>
    <div className="account-login">
      <div className="login-box mx-auto my-auto">
        <div className="pt-12 mt-32">
          <img src={Img__canfone_logo_white} className="mx-auto" alt="" />
        </div>
        <div className="py-10">
          <p className="text-base text-white font-light mb-4 text-center">
            { (lang === "en") ? "Manage your Canfone services online." : "Gérez vos services Canfone en ligne."}
          </p>
          <div className="px-20">
            <div className="mb-4">
              <input className="bg-gray-100 text-xl appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 grey-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Email" defaultValue="" />
            </div>
            <div className="mb-4">
              <input className="bg-gray-100 text-xl appearance-none border-2 border-gray-500 rounded w-full py-2 px-4 grey-600 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Password" defaultValue="" />
            </div>
            <div className="text-right">
              <button onClick={login} className="open-sans-button-turquoise text-xl text-white py-2 px-4 mt-6 rounded">
                { (lang === "en") ? "Login" : "Connexion"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}