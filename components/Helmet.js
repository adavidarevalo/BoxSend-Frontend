import React from "react"
import {Helmet} from "react-helmet"


export const SEO = () => {
  return (
    <div>
      <Helmet htmlAttributes>
        <html lang="en" />
        <title>BoxSend</title>
        <meta name="description" content="Send a file easy and fast" />
        <link id="favicon" rel="icon" href='https://cdn0.iconfinder.com/data/icons/lined-delivery/48/a-16-512.png' type="image/png"/>
      </Helmet>
    </div>
  );
}