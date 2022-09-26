<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48px"
    height="48px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle cx="36.6559" cy="50" class="fill-yellowDs" r="20">
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.5;1"
        values="30;70;30"
        begin="-0.5s"
      ></animate>
    </circle>
    <circle cx="63.3441" cy="50" class="fill-purpleDs" r="20">
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.5;1"
        values="30;70;30"
        begin="0s"
      ></animate>
    </circle>
    <circle cx="36.6559" cy="50" class="fill-yellowDs" r="20">
      <animate
        attributeName="cx"
        repeatCount="indefinite"
        dur="1s"
        keyTimes="0;0.5;1"
        values="30;70;30"
        begin="-0.5s"
      ></animate>
      <animate
        attributeName="fill-opacity"
        values="0;0;1;1"
        calcMode="discrete"
        keyTimes="0;0.499;0.5;1"
        dur="1s"
        repeatCount="indefinite"
      ></animate>
    </circle>
  </svg>
</template>
