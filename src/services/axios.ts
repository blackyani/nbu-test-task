import axios from 'axios';

const baseURL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';

const instance = axios.create({
    baseURL
});

export default instance;
