<script setup lang="ts">
import {Button, Column, DataTable, IconField, InputIcon, InputText} from "primevue";
import {useEditedStore} from "@/store";
import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";
import router from "@/router";
import useFilters from "@/composables/useFilters.ts";

const editedStore = useEditedStore();
const { initFilters, filters, globalFilterFields } = useFilters();

const selectRow = (data: CurrencyRate) => {
  router.push({ path: `/currency-edit/${data.r030}`, query: {
      isEdit: 'true'
  }});
}
</script>

<template>
    <DataTable
        v-model:filters="filters"
        filterDisplay="menu"
        :globalFilterFields="globalFilterFields"
        v-if="editedStore.editedCurrencies.length"
        :value="editedStore.editedCurrencies"
        paginator
        :rows="10"
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
    <h3 v-else>There is no edited currencies at this moment...</h3>
</template>
