import { bitcoinService } from "../../services/bitcoinService";

export function saveData(history) {
    return async dispatch => {
        const data = await bitcoinService.getDataFromApi(history)
        dispatch({ type: 'SET_DATA', data })
    }
}

export function sortData(sortByObj, sortingData) {
    return async dispatch => {
        const data = await bitcoinService.sort(sortByObj, sortingData)
        dispatch({ type: 'SET_DATA', data })
    }
}
