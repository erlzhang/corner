import Header from "./header";
import Footer from "./footer";
import React from "react";
import { Helmet } from "react-helmet"
import "../styles/common.css";

export default function Layout({ children, siteInfo }) {
  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>trace-demo</title>
      </Helmet>
      <Header siteInfo={siteInfo}/>
      <main className="posts">
        { children }
      </main>
      <Footer/>
    </div>
  )
}
