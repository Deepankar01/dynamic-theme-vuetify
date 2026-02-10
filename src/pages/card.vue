<script setup lang="ts">
  import type { Booking } from '../types' // Adjust the import path based on where your Booking type is defined
  import ReservationCard3 from '../components/reservation-card-improved.vue'
  import ReservationCard2 from '../components/reservation-card-svg-approach.vue'
  import ReservationCard4 from '../components/reservation-card-update.vue'
  import ReservationCard from '../components/ReservationCard.vue'
  const booking: Booking = {
    bookingId: 'BK_10231',
    checkinAt: new Date('2026-02-10'),
    checkoutAt: new Date('2026-02-12'),
    roomCategoryId: 'DELUXE',
    totalGuests: 2,
    guests: [
      {
        id: 'G1',
        fullName: 'Murphy Phillips',
        type: 'adult',
        isPrimary: true,
      },
      {
        id: 'G2',
        fullName: 'ABC',
        type: 'child',
        isPrimary: false,
      },
    ],
  }
</script>

<template>
  <div class="page-bg">
    <ReservationCard><div style="color: white;">Hello 1</div></ReservationCard>
    <ReservationCard2><div style="color: white;">Hello 2</div></ReservationCard2>
    <ReservationCard3><div style="color: white;">Hello 3</div></ReservationCard3>
    <ReservationCard4><div style="color: white;">Hello 4</div></ReservationCard4>
  </div>
</template>

<style scoped>
  .page-bg{
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #116397 0%, #064B77 100%);
    padding: 10px 30px 0px 30px;
    justify-content: center;
    height: 100%;
    align-items: center;
    display: flex;
    column-gap: 20px;
  }
</style>
