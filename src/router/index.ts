import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import EditedCurrencies from '@/views/EditedCurrencies.vue';
import CurrencySearch from '@/views/CurrencySearch.vue';
import CurrencyDetails from '@/views/CurrencyDetails.vue';

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/edited-currencies', component: EditedCurrencies, name: 'ChangedCurrencies' },
    { path: '/currency-search', component: CurrencySearch, name: 'CurrencySearch' },
    { path: '/currency-details/:id', component: CurrencyDetails, name: 'CurrencyDetails' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
