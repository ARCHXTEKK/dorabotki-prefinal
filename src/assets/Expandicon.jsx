import React from "react";

export default function Expandicon({ rotated = false, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
      width="47.5px"
      height="47.5px"
      viewBox="0 0 47.5 47.5"
      preserveAspectRatio="none"
      className={className + (rotated ? " rotated" : "")}
    >
      <path
        fillRule="evenodd"
        stroke="rgb(213, 213, 213)"
        strokeWidth="1px"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        opacity="0.2"
        fill="rgb(213, 213, 213)"
        d="M23.500,1.500 C35.650,1.500 45.500,11.350 45.500,23.500 C45.500,35.650 35.650,45.500 23.500,45.500 C11.350,45.500 1.500,35.650 1.500,23.500 C1.500,11.350 11.350,1.500 23.500,1.500 Z"
      />
      <image
        x="9.5px"
        y="17.5px"
        width="28px"
        height="16px"
        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAQCAMAAAAyEe/dAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA2FBMVEU4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceA4ceD///9kf9nrAAAARnRSTlMABGrmmRMOjuJwB/GaFhGV/PNt+J4X8Pei8nn1FHoG9qQZFaD5f6b6CHf+qRunfQl29P2tHXt0sRwSqwFytLYCc3VvbgNx7K7X7QAAAAFiS0dER2C9yXsAAAAHdElNRQfoCxkSFSqfrkKXAAAAz0lEQVQY022R1xqCMAyFA4qj4GKoqOCeOHBvcfb9H0kaUD7E3LTn/E3TpMDxsbgAkUgkU2kCvEiplPll2VyeFmRQqBuqFmaCxNwilNhCyyEqqGjqUKlGaM1jigFmpY7bRvPDWm00Ol0CQHza86lQRtnvDpgiQ6Qja8xUZjLCO6cz76xpz5leLFcAmoWsviafKtxGx9ztbn9ANje44H3Hk4h1zpcO9mA7obavmOuFaP8OLP2l+i0y6eNd9Fhh40CUPpBWT38YwFN2PyH/egbOG+C/LuV+sDEnAAAAAElFTkSuQmCC"
      />
    </svg>
  );
}
