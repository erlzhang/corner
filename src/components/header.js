import React from "react";

export default function Header({ siteInfo }) {
  return (
    <div class="header">
    {
      siteInfo.avatar &&
      <img src={siteInfo.avatar.url} class="header-avatar"/>
    }
			<h1 class="header__title">Corner</h1>
			<p class="header__desc">Hello World!</p>
    </div>
  );
}
