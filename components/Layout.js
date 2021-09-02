
import React from "react"
import Head from "next/head"
import Header from "../components/Header"
import {css} from "@emotion/react"

const Layout = ({children}) =>{
  return(
    <div css={css`
    background: #f4f7fa;
    min-height: 100vh;
    `}>
       <Head>
         <title>BoxSend</title>
         <meta name="description" content="Send and Receive files fast and free" />
         <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;1,700&family=Roboto:wght@300;700&display=swap" rel="stylesheet" />
       </Head>
       <Header/>
        {children}
    </div>
  )
}

export default Layout