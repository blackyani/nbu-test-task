import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import EditedCurrencies from '@/views/EditedCurrencies.vue';
import CurrencySearch from '@/views/CurrencySearch.vue';
import CurrencyEdit from '@/views/CurrencyEdit.vue';

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/edited-currencies', component: EditedCurrencies, name: 'ChangedCurrencies' },
    { path: '/currency-search', component: CurrencySearch, name: 'CurrencySearch' },
    { path: '/currency-edit/:id', component: CurrencyEdit, name: 'CurrencyEdit' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
