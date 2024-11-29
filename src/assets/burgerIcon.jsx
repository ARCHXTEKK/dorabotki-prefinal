import React from "react";

export default function BurgerIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      width="96.5px"
      height="68.5px"
      viewBox="0 0  96.5 68.5"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        stroke="rgb(92, 95, 109)"
        strokeWidth="1px"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="rgb(92, 95, 109)"
        d="M4.871,1.838 L92.129,1.838 C93.234,1.838 94.129,2.734 94.129,3.838 L94.129,6.603 C94.129,7.707 93.234,8.603 92.129,8.603 L4.871,8.603 C3.766,8.603 2.871,7.707 2.871,6.603 L2.871,3.838 C2.871,2.734 3.766,1.838 4.871,1.838 Z"
      />
      <path
        fillRule="evenodd"
        stroke="rgb(92, 95, 109)"
        strokeWidth="1px"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="rgb(92, 95, 109)"
        d="M4.871,59.397 L90.129,59.397 C91.786,59.397 93.129,60.740 93.129,62.397 L93.129,63.162 C93.129,64.819 91.786,66.162 90.129,66.162 L4.871,66.162 C3.214,66.162 1.871,64.819 1.871,63.162 L1.871,62.397 C1.871,60.740 3.214,59.397 4.871,59.397 Z"
      />
      <path
        fillRule="evenodd"
        stroke="rgb(92, 95, 109)"
        strokeWidth="1px"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        fill="rgb(92, 95, 109)"
        d="M5.871,29.779 L91.129,29.779 C92.786,29.779 94.129,31.123 94.129,32.779 L94.129,33.544 C94.129,35.201 92.786,36.544 91.129,36.544 L5.871,36.544 C4.214,36.544 2.871,35.201 2.871,33.544 L2.871,32.779 C2.871,31.123 4.214,29.779 5.871,29.779 Z"
      />
    </svg>
  );
}
