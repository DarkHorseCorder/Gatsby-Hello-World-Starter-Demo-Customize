const React = require("react")
// Adds a class name to the body element
exports.onRenderBody = props => {
  const {setBodyAttributes} = props

  setBodyAttributes({
    className: "bg-white font-open-sans",
  })
}
