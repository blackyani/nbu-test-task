import {defineStore} from "pinia";
import axios from '@/services/axios';

export const useCurrencyStore = defineStore('currency',{
    state: () => ({
        currencies: []
    }),
    actions: {
        async fetchCurrencyRates() {
            try {
                const response = await axios.get('?json');
                this.currencies = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
})
