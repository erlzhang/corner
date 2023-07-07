import React from "react";

export default function Header({ siteInfo }) {
  return (
    <div class="header">
      <div
        className="header-cover"
        style={{
          backgroundImage: `url(${siteInfo.cover})`
        }}
      ></div>
        <div
          class="header-avatar-container"
        >
          <img src={siteInfo.avatar} class="header-avatar"/>
        </div>
      <div
        className="header-content"
      >
			  <h1 class="header__title">{ siteInfo.title }</h1>
			  <p class="header__desc">{ siteInfo.description }</p>
      </div>
    </div>
  );
}
