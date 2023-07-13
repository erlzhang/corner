import React from "react";
import { Link } from "gatsby";

export default function Pagination({ currentPage, pageCount }) {
  let prev = currentPage > 1 && currentPage - 1;
  let next = currentPage < pageCount && currentPage + 1;

  let prevUrl = prev === 1 ? "/" : `/${prev}`;
  let nextUrl = `/${next}`;

  return (
    <div className="pagination">
      {
        prev &&
        <Link className="nav-link prev" to={prevUrl}> ←上一页</Link>
      }
      {
        next &&
        <Link className="nav-link next" to={nextUrl}>下一页 →</Link>
      }
    </div>
  )
}
