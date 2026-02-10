<template>
  <div class="reservation-card">
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

/* "distortion / circular blooms" - IMPROVED VERSION */
.reservation-card::before {
  content: "";
  position: absolute;
  inset: -80px;
  pointer-events: none;

  /* Multi-stop gradients for smoother transitions and less banding */
  background: radial-gradient(
      circle 278px at 77.87% 65%,
      rgba(0, 144, 154, 0.8) 0%,
      rgba(0, 144, 154, 0.7) 15%,
      rgba(0, 144, 154, 0.5) 30%,
      rgba(0, 144, 154, 0.3) 45%,
      rgba(0, 144, 154, 0.15) 60%,
      transparent 75%
    ),
    radial-gradient(
      circle 315px at 77.87% 15%,
      rgba(31, 127, 189, 0.8) 0%,
      rgba(31, 127, 189, 0.7) 15%,
      rgba(31, 127, 189, 0.5) 30%,
      rgba(31, 127, 189, 0.3) 45%,
      rgba(31, 127, 189, 0.15) 60%,
      transparent 75%
    ),
    radial-gradient(
      circle 228px at 10% 40%,
      rgba(132, 203, 248, 0.5) 0%,
      rgba(132, 203, 248, 0.4) 20%,
      rgba(132, 203, 248, 0.3) 40%,
      rgba(132, 203, 248, 0.2) 60%,
      rgba(132, 203, 248, 0.1) 80%,
      transparent 100%
    );

  /* Increased blur for smoother gradients */
  filter: blur(40px);
  opacity: 1;
  mix-blend-mode: color-burn;

  /* Force GPU acceleration for smoother rendering */
  transform: translateZ(0);
  will-change: transform;
}

.reservation-card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;

  /* Enhanced shine with more stops for smoother transitions */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.3) 10%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.1) 30%,
    rgba(255, 255, 255, 0.06) 45%,
    rgba(255, 255, 255, 0.04) 55%,
    rgba(255, 255, 255, 0.02) 70%,
    rgba(0, 0, 0, 0.05) 85%,
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

  /* GPU acceleration */
  transform: translateZ(0);
}
</style>
