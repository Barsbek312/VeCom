import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={390}
    height={309}
    viewBox="0 0 400 300"
    backgroundColor="#c8c8c8"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="50" ry="50" width="40" height="40" /> 
    <rect x="48" y="5" rx="5" ry="5" width="47" height="9" /> 
    <rect x="48" y="23" rx="5" ry="5" width="78" height="9" /> 
    <rect x="0" y="53" rx="5" ry="5" width="346" height="160" /> 
    <rect x="0" y="230" rx="5" ry="5" width="346" height="25" />
  </ContentLoader>
)

export default MyLoader

