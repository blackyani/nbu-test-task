import {defineStore} from "pinia";
import axios from '@/services/axios';

import CurrencyRate from "@/lib/interfaces/CurrencyRate.ts";
import {getYYMMDDFormat} from "@/lib/utils.ts";
import {ref} from "vue";

export const useSearchCurrencyStore = defineStore( 'search-currency', () => {
    const currencies = ref<CurrencyRate[] | null>(null);

    const loading = ref(false);

    const fetchCurrencyRates = async (date: Date) => {
        const formattedDate = getYYMMDDFormat(date);
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
