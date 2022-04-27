import React from "react";

function ArrowIcon({ width = "100%", height = "100%", direction = "" }) {
    let angle = 0;
    switch (direction) {
        case 'up':
            angle = 90;
            break;
        case 'down':
            angle = -90;
            break;
        case 'left':
            angle = 0;
            break;
        case 'right':
            angle = 180;
            break;
        default:
            angle = 0;
    };

  return (
    <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 46 51"
          style={{ transform: `rotate(${angle}deg)` }}
    >
      <g filter="url(#filter0_d_105_117)">
        <path
          fill="#E5ADB4"
          fillRule="evenodd"
          d="M4 21.535L41.09.33l-7.977 21.112 7.813 20.926L4 21.535z"
          clipRule="evenodd"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_105_117"
          width="45.09"
          height="50.038"
          x="0"
          y="0.33"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_105_117"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_105_117"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default ArrowIcon;
