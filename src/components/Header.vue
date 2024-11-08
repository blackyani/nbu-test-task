<script setup lang="ts">
import {Button, Toolbar} from "primevue";
</script>

<template>
  <Toolbar class="header">
    <template #start>
      <div class="flex items-center gap-2">

        <Button class="button-link" as="router-link" severity="contrast" label="Home" to="/" />
        <Button class="button-link" as="router-link" severity="contrast" label="Edited" to="/edited-currencies" />
        <Button class="button-link" as="router-link" severity="contrast" label="Search" to="/currency-search" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped lang="scss">
  .header {
    border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem;
    margin-bottom: 1rem;

    .button-link {
      margin-right: 1rem;
    }
  }

</style>
