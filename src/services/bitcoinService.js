export const bitcoinService = {
    getDataFromApi,
    sort,
    formatMoney
}

const axios = require('axios');


async function getDataFromApi(timePeriod) {
    let history = ''

    switch (timePeriod) {
        case '1min':
            history = 'histominute?aggregate=1&e'
            break;
        case '5min':
            history = 'histominute?aggregate=5&e'
            break;
        case '1hour':
            history = 'histohour?aggregate=1&e'
            break;
        case '1week':
            history = 'histoday?aggregate=6&e'
            break;
    }

    const BASE_URL = `https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/${history}=CCCAGG&fsym=BTC&tsym=usd&limit=30`
    const { data } = await axios.get(BASE_URL)
    return data
}

function sort(sortBy, sortingData) {
    const { name } = sortBy
    const { type } = sortBy

    if (name === 'Date') return _sortByDate(sortingData, name, type)

    if (type === 'bigNum') sortingData.data.sort((a, b) => (a[name] < b[name]) ? 1 : -1)
    else if (type === 'smallNum') sortingData.data.sort((a, b) => (a[name] > b[name]) ? 1 : -1)

    return sortingData
}

function _sortByDate(arr, name, type) {
    if (type === 'bigNum') {
        arr.data.sort(function (a, b) {
            return new Date(b[name]) - new Date(a[name]);
        });
    } else {
        arr.data.sort(function (a, b) {
            return new Date(a[name]) - new Date(b[name]);
        });
    }
    return arr
}

function formatMoney(num) {
    return num.toLocaleString('en-US', { currency: 'USD' });
}



