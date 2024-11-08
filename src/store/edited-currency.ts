import {defineStore} from "pinia";

import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";
import { ref } from "vue";

export const useEditedStore = defineStore( 'edited-currencies', () => {
    const editedCurrencies = ref<CurrencyRate[]>([]);

    const handleAddCurrency = (currency: CurrencyRate) => {
        editedCurrencies.value.push(currency)
    }

    const handleChangeCurrency = (currency: CurrencyRate) => {
        const idx = editedCurrencies.value.findIndex((item) => item.r030 === currency.r030);

        if(idx !== -1) {
            editedCurrencies.value.splice(idx, 1, currency)
        }
    }

    return {
        editedCurrencies,
        handleAddCurrency,
        handleChangeCurrency
    }
});
