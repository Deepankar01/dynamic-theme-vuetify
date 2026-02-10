<template>
  <div class="reservation-card">
    <!-- SVG filter for better gradient quality -->
    <svg height="0" style="position: absolute;" width="0">
      <defs>
        <filter
          id="smoothBlur"
          height="200%"
          width="200%"
          x="-50%"
          y="-50%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
      </defs>
    </svg>

    <div class="gradient-layer" />
    <div class="content-wrapper">
      <slot />
    </div>
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

/* Separate gradient layer with SVG filter */
.gradient-layer {
  content: "";
  position: absolute;
  inset: -80px;
  pointer-events: none;
  z-index: -1;

  background:
    radial-gradient(
      circle 278px at 77.87% 65%,
      rgba(0, 144, 154, 0.8) 0%,
      rgba(0, 144, 154, 0.65) 12%,
      rgba(0, 144, 154, 0.5) 25%,
      rgba(0, 144, 154, 0.35) 37%,
      rgba(0, 144, 154, 0.2) 50%,
      rgba(0, 144, 154, 0.1) 62%,
      transparent 75%
    ),
    radial-gradient(
      circle 315px at 77.87% 15%,
      rgba(31, 127, 189, 0.8) 0%,
      rgba(31, 127, 189, 0.65) 12%,
      rgba(31, 127, 189, 0.5) 25%,
      rgba(31, 127, 189, 0.35) 37%,
      rgba(31, 127, 189, 0.2) 50%,
      rgba(31, 127, 189, 0.1) 62%,
      transparent 75%
    ),
    radial-gradient(
      circle 228px at 10% 40%,
      rgba(132, 203, 248, 0.5) 0%,
      rgba(132, 203, 248, 0.4) 16%,
      rgba(132, 203, 248, 0.3) 33%,
      rgba(132, 203, 248, 0.2) 50%,
      rgba(132, 203, 248, 0.1) 66%,
      rgba(132, 203, 248, 0.05) 83%,
      transparent 100%
    );

  /* Combined CSS and SVG filtering for maximum smoothness */
  filter: url(#smoothBlur) blur(40px);
  opacity: 1;
  mix-blend-mode: color-burn;

  /* Prevent banding on lower-quality displays */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  /* Force GPU with subpixel positioning */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

.reservation-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;

  /* Multi-stop shine for ultra-smooth transitions */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.35) 5%,
    rgba(255, 255, 255, 0.3) 10%,
    rgba(255, 255, 255, 0.25) 15%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.15) 25%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.06) 40%,
    rgba(255, 255, 255, 0.04) 55%,
    rgba(255, 255, 255, 0.02) 70%,
    rgba(0, 0, 0, 0.02) 80%,
    rgba(0, 0, 0, 0.05) 90%,
    rgba(0, 0, 0, 0.1) 100%
  );
  opacity: 0.22;

  mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
  padding: 1px;
  -webkit-mask: linear-gradient(#000, #000) content-box,
    linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;

  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);

  transform: translate3d(0, 0, 0);
}
</style>
