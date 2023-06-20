import React from "react";

export default function Pagination({ currentPage, pageCount }) {
  let prev = currentPage > 1 && currentPage - 1;
  let next = currentPage < pageCount && currentPage + 1;

  let prevUrl = prev === 1 ? "/" : `/${prev}`;
  let nextUrl = `/${next}`;

  return (
    <div className="pagination">
      {
        prev &&
        <a className="nav-link prev" href={prevUrl}>← 上一页</a>
      }
      {
        next &&
        <a className="nav-link next" href={nextUrl}>下一页 →</a>
      }
    </div>
  )
}
