import {defineStore} from "pinia";
import axios from '@/services/axios';

import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";
import {ref} from "vue";
import {getYYMMDDFormat} from "@/lib/utils.ts";

export const useCurrencyStore = defineStore( 'currency', () => {
    const currencies = ref<CurrencyRate[] | null>(null);
    const formattedDate = getYYMMDDFormat(new Date());
    const loading = ref(false);

    const fetchCurrencyRates = async () => {
        loading.value = true;
        try {
            const response = await axios.get<CurrencyRate[]>(`?date=${formattedDate}&json`);
            currencies.value = response.data
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        currencies,
        fetchCurrencyRates
    }
});
