<template>
  <div class="reservation-card">
    <span aria-hidden="true" class="grain" />
    <slot />
  </div>
</template>

<style scoped>
.reservation-card {
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  isolation: isolate;

  background: rgb(201 195 195 / 20%);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.1px);
  -webkit-backdrop-filter: blur(5.1px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  height: 540px;
  width: 357px;
  padding: 16px;
}
/* "distortion / circular blooms" */
.reservation-card::before {
  content: "";
  position: absolute;
  inset: -80px;
  pointer-events: none;

  background: radial-gradient(
      278px 278px at 77.87% 65%,
      rgba(0, 144, 154, 0.75) 0%,
      rgba(0, 144, 154, 0.35) 45%,
      rgba(0, 144, 154, 0) 75%
    ),
    radial-gradient(
      315px 315px at 77.87% 15%,
      rgba(31, 127, 189, 0.7) 0%,
      rgba(31, 127, 189, 0.3) 45%,
      rgba(31, 127, 189, 0) 75%
    ),
    radial-gradient(
      228px 228px at 10% 40%,
      rgba(132, 203, 248, 0.45) 0%,
      rgba(132, 203, 248, 0.18) 50%,
      rgba(132, 203, 248, 0) 80%
    );

  filter: blur(18px);
  opacity: 1;
  mix-blend-mode: color-burn; /* gives that “liquid light” feel */
}
.reservation-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;

  /* subtle top-left to bottom-right shine */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.04) 55%,
    rgba(0, 0, 0, 0.1)
  );
  opacity: 0.22;

  /* keeps shine mostly near edges */
  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  padding: 1px;
  -webkit-mask: linear-gradient(#000, #000) content-box,
    linear-gradient(#000, #000);
  padding: 1px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  /* Chrome/Edge */
  mask-composite: exclude;
  /* Safari */
  -webkit-mask-composite: xor;
}
.grain {
  position: absolute;
  inset: -20%;
  pointer-events: none;
  z-index: 3; /* above blooms + shine */
  opacity: 0.03; /* tune 0.03–0.10 */
  mix-blend-mode: overlay; /* or soft-light */

  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  transform: translateZ(0); /* helps rendering */
}
</style>
