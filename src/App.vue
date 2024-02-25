<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavLinks from '@/components/NavBar/NavLinks.vue'
import NavMobile from '@/components/NavBar/NavMobile.vue'
import logo from '@/assets/images/logo.png'
</script>

<template>
  <!-- Set up logic for the desktop and mobile navigation -->
  <header>
      <nav>
        <div class="container-nav-desktop">
          <img :src="logo" alt="project-logo">
          <NavLinks/>
        </div>
        <div class="container-nav-tablet-mobile">
          <img :src="logo" alt="project-logo">
          <NavMobile/>
        </div>
        <v-divider class="divider"></v-divider>
      </nav>
  </header>
  <div class="router-view">
    <RouterView/>
  </div>
</template>

<style scoped>

  .router-view {
    width: 100%;
  }

  .container-nav-desktop img {
    width: 70%;
    height: auto;
    margin-bottom: 15px;
    padding-left: 5px;
  }

  .divider {
    display: none;
  }

  .container-nav-tablet-mobile img {
    height: 40%;
    width: auto;
  }

  nav {
    width: 200px;
    height: 100%;
    margin-right: 20px;
  }

  .container-nav-desktop {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    border-right: 1px solid var(--tertiary-background-color);
    padding: 0 10px;
  }

  .container-nav-tablet-mobile {
    display: none;
    height: 100%;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (width < 992px) {
    .container-nav-desktop {
      display: none;
    }

    .container-nav-tablet-mobile {
      display: flex;
    }

    .divider {
      display: block;
    }

    nav {
      width: 100%;
      margin-right: 0;
      height: 55px;
    }

    header {
      height: 75px;
    }
}

</style>


