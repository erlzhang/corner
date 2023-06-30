import React, { useState } from "react";
import { MEDIA_URL } from "../data/common";
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

export default function Gallery({ images }) {
  let column = 3;

  /*
  if (images.length === 2 || images.length === 4) {
    column = 2;
  } else if (images.length === 1) {
    column = 1;
  }
  */

  const width = Math.ceil(600 / column);
  const height = Math.ceil(width * 1);

  let process = 'image/resize,';
  if (column > 1) {
    process += 'm_fill,';
  }
  process += `h_${height}`;
  if (column > 1) {
    process += `,w_${width}`;
  }


  const urls = images.map(img => {
    let url = `${MEDIA_URL}${img}`;
    return (
      <a href={`${url}?x-oss-process=image/resize,l_1280`}>
        <img src={`${url}?x-oss-process=${process}`} className={`col col-${column}`}/>
      </a>
    );
  });

  return (
    <div class="gallery-preview">
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
         { urls }
      </LightGallery>
    </div>
  )
}
