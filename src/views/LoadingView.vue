<style scoped>
.loading-view {
  min-height: calc(100dvh - var(--header-height));
  background: linear-gradient(to bottom, #040404, #de4545);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.loading-view__top {
  flex-grow: 1;
  margin-inline: auto;
  max-width: 320px;
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo-spaceholder {
  height: 110px;
}

.logo {
  position: relative;
  height: 200px;
  transform: translateY(-30%);
}

.logo__ellipse {
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  filter: blur(40px);
}

.logo__ellipse--1 {
  z-index: 1;
  width: 160px;
  height: 160px;
  background-color: #bea5204d;
}

.logo__ellipse--2 {
  z-index: 2;
  width: 118px;
  height: 118px;
  background-color: #bea52080;
}

.logo__image {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.text {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text__brand {
  display: none;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 1.21;
  text-align: center;
  text-transform: uppercase;
  -webkit-text-stroke: 1px #da4453;

  @supports (-webkit-background-clip: text) {
    background: linear-gradient(to bottom, #ffffff, #f1f168);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @supports not (-webkit-background-clip: text) {
    color: #f1f168;
  }
}

.text_line {
  width: 100%;
  height: 40px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}

.text_line--1 {
  font-size: 24px;
  font-weight: 800;
  background-color: #fff;
  color: #bf4343;
}

.text_line--2 {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  font-family: 'Caveat', sans-serif;
}

.loading {
  position: sticky;
  bottom: 0;
  padding: 1rem 2rem;
  background-color: #252323;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading__label {
  font-size: 14px;
  color: #ddd;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.loading__coffee-name {
  color: #f5e3c3;
}

@media (min-height: 640px) {
  .logo-spaceholder {
    height: 160px;
  }

  .logo {
    transform: translateY(-10%);
  }
}

@media (min-height: 800px) {
  .loading-view {
    min-height: calc(100dvh - var(--footer-height) - var(--header-height));
  }
}

@media (min-width: 414px) {
  .loading__coffee-name {
    font-size: 17px;
  }

  .text {
    margin-block-start: 30px;
  }
}

@media (min-width: 600px) {
  .logo-spaceholder {
    height: auto;
  }

  .logo {
    height: 200px;
    transform: translateY(0);
  }

  .logo__ellipse--1 {
    width: 210px;
    height: 210px;
  }

  .logo__ellipse--2 {
    width: 168px;
    height: 168px;
  }

  .logo__image {
    width: 99px;
  }
}

@media (min-width: 768px) {
  .text__brand {
    margin-block-end: 16px;
    display: block;
    transform: translateY(-14px);
  }

  .loading {
    margin-inline: auto;
    margin-block-end: 24px;
    width: auto;
    border-radius: 16px;

    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 32px;
  }

  .loading__image {
    grid-column: 1;
    grid-row: 1 / 3;
    place-self: center;
  }

  .loading__label span {
    font-size: 16px;
  }

  .loading__coffee-name {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .text_line {
    height: 55px;
  }

  .text__brand {
    font-size: 44px;
  }

  .text_line--1 {
    font-size: 36px;
  }

  .text_line--2 {
    font-size: 40px;
  }
}
</style>

<template>
  <div class="loading-view">
    <section class="loading-view__top">
      <div class="logo-spaceholder">
        <div class="logo">
          <div class="logo__ellipse logo__ellipse--1" />
          <div class="logo__ellipse logo__ellipse--2" />
          <img src="/images/vendicafe.png" alt="logo" width="65" class="logo__image" />
        </div>
      </div>
      <div class="text">
        <strong class="text__brand">Vendicafe</strong>
        <strong class="text_line text_line--1">{{ localization.t('Kawa na', 'Coffee to') }}</strong>
        <strong class="text_line text_line--2">{{
          localization.t('Dzień dobry', 'Start your day')
        }}</strong>
      </div>
    </section>

    <div class="loading">
      <p class="loading__label">
        <span>{{ localization.t('Trwa przygotowywanie kawy', 'Preparing coffee') }}:</span>
        <strong class="loading__coffee-name">{{ localization.t(coffee.name) }}</strong>
      </p>
      <ProgressLoader :seconds="coffee.timeEffort" @finish="openReadyModal" />
      <img src="/images/coffee.gif" alt="coffee" width="100" class="loading__image" />
    </div>
  </div>

  <CoffeeReadyModal :show="readyModalOpen" />
</template>

<script>
import localization from '@/localization'

import ProgressLoader from '@/components/ProgressLoader.vue'
import CoffeeReadyModal from '@/views/CoffeeReadyModal.vue'
import { data as coffeeData } from '@/data'

export default {
  name: 'LoadingView',
  components: {
    ProgressLoader,
    CoffeeReadyModal,
  },
  data() {
    return {
      localization,
      readyModalOpen: false,
    }
  },
  methods: {
    openReadyModal() {
      this.readyModalOpen = true
    },
  },
  computed: {
    coffee() {
      const id = this.$route.params.id

      return coffeeData.find((coffee) => coffee.id === id)
    },
  },
}
</script>
