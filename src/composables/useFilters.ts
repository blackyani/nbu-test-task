import {FilterMatchMode} from "@primevue/core/api";
import {ref} from "vue";

export default () => {
    const filters = ref();
    const globalFilterFields = ['r030', 'txt', 'rate', 'cc', 'exchangedate'];
    const initFilters = () => {
        filters.value = {
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'r030': { value: null, matchMode: FilterMatchMode.CONTAINS },
            txt: { value: null, matchMode: FilterMatchMode.CONTAINS },
            rate: { value: null, matchMode: FilterMatchMode.CONTAINS },
            cc: { value: null, matchMode: FilterMatchMode.CONTAINS },
            exchangedate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        };
    };

    initFilters();

    return {
        filters,
        initFilters,
        globalFilterFields
    }
}
