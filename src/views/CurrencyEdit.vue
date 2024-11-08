<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from "@/router";
import { InputText, Message, Button } from "primevue";
import { Form } from '@primevue/forms';
import { yupResolver } from '@primevue/forms/resolvers/yup';
import * as yup from 'yup';
import {computed, onMounted, ref} from "vue";

import { useCurrencyStore, useEditedStore, useSearchCurrencyStore } from "@/store";
import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";

const currencyStore = useCurrencyStore();
const editedStore = useEditedStore();
const searchedStore = useSearchCurrencyStore();
const route = useRoute();
const id = Number(route.params.id);
const isCreate = route.query.isCreate;
const isSearch = route.query.isSearch;
const isEdit = route.query.isEdit;
const currentCurrency = ref<CurrencyRate | null>(null);
const currentList = computed(() => {
  if (isCreate) return currencyStore.currencies;
  if (isSearch) return searchedStore.currencies;
  if (isEdit) return editedStore.editedCurrencies
  return currencyStore.currencies;
});

const resolver = ref(yupResolver(
    yup.object().shape({
      txt: yup.string().required('Text is required'),
      rate: yup.string().required('Rate is required'),
    })
));

const onFormSubmit = ({ valid, values }: { valid: boolean, values: CurrencyRate }) => {
  if (valid) {
    const editedCurrency = {
      ...currentCurrency.value,
      ...values,
      ...(!isEdit && { 'r030': Number(currentCurrency?.value?.r030) + Date.now() }), // Workaround to always get unique id if we have 2 same currencies
      rate: Number(values.rate)
    }
    if (editedStore.editedCurrencies.some(item => item.r030 === editedCurrency.r030) && !isCreate) {
      editedStore.handleChangeCurrency(editedCurrency);
    } else {
      editedStore.handleAddCurrency(editedCurrency);
    }
    router.push('/edited-currencies');
  }
};

onMounted( async () => {
  if (!currencyStore.currencies?.length) {
    await currencyStore.fetchCurrencyRates()
  }
  currentCurrency.value = currentList.value?.find((item) => item.r030 === id) || null;
})
</script>

<template>
  <Form v-if="currentCurrency" v-slot="$form" :initialValues="currentCurrency" :resolver @submit="onFormSubmit">
      <InputText name="txt" type="text" placeholder="Title" fluid />
      <Message v-if="$form.txt?.invalid" severity="error" size="small" variant="simple">{{ $form.txt.error?.message }}</Message>
      <InputText class="rate-input" name="rate" type="number" placeholder="Rate" fluid />
      <Message v-if="$form.rate?.invalid" severity="error" size="small" variant="simple">{{ $form.rate.error?.message }}</Message>
      <Button class="submit-button" type="submit" severity="secondary" label="Submit" />
  </Form>

</template>

<style scoped>
  .rate-input {
    margin-top: 1rem;
  }
  .submit-button {
    margin-top: 1rem;
  }
</style>
