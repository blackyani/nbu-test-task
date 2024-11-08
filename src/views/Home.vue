<script setup lang="ts">
import { DataTable, Column, Button, ProgressSpinner, IconField, InputIcon, InputText } from "primevue";

import router from "@/router";
import {onMounted} from "vue";

import {useCurrencyStore} from "@/store";
import useFilters from "@/composables/useFilters.ts";
import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";

const store = useCurrencyStore();
const { initFilters, filters, globalFilterFields } = useFilters();

  const selectRow = (data: CurrencyRate) => {
    router.push({ path: `/currency-edit/${data.r030}`, query: {
        isCreate: 'true'
      }});
  }

  onMounted(() => {
    store.fetchCurrencyRates();
  })
</script>

<template>
  <div class="spinner-wrapper" v-if="store.loading">
    <ProgressSpinner />
  </div>
  <DataTable
      v-model:filters="filters"
      filterDisplay="menu"
      :globalFilterFields="globalFilterFields"
      v-else-if="!store.loading && store.currencies?.length"
      :value="store.currencies" paginator :rows="10"
  >
    <template #header>
      <div class="flex justify-between">
        <Button
            severity="contrast"
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="initFilters()"
        />
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </IconField>
      </div>
    </template>
    <Column field="r030" header="Id"></Column>
    <Column field="txt" header="Title"></Column>
    <Column field="rate" header="Rate"></Column>
    <Column field="cc" header="Ticker"></Column>
    <Column field="exchangedate" header="Exchange date"></Column>
    <Column class="w-24 !text-end">
      <template #body="{ data }">
        <Button icon="pi pi-pencil" @click="selectRow(data)" severity="secondary" rounded></Button>
      </template>
    </Column>
  </DataTable>
  <h3 v-else>Sorry something went wrong with data...</h3>
</template>
