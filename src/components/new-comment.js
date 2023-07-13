import React from "react";
import {
  GRAVATAR_URL
} from "../data/common";

export default function NewComment({email, onFocus}) {
  return (
    <div className="comment-form">
        <img
          src={`${GRAVATAR_URL}${ email }?d=mm&s=30`}
          className="comment-input-avatar"
        />
        <a
          onClick={onFocus}
          className="comment-input"
        ></a>
        <button></button>
    </div>
  )
}
