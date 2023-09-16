import React from "react"
import ContentLoader from "react-content-loader"

const ContentLoaderInNotifications = (props) => (
  <ContentLoader 
    speed={2}
    width={420}
    height={70}
    viewBox="0 0 420 70"
    backgroundColor="#c8c8c8"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="420" height="60" />
  </ContentLoader>
)

export default ContentLoaderInNotifications

