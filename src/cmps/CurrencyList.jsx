import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveData, sortData } from '../store/actions/bitcoinActions'
import moment from "moment-timezone";
import { bitcoinService } from '../services/bitcoinService';


export const CurrencyList = () => {

    const dispatch = useDispatch()
    const { dataToShow } = useSelector(state => state.bitcoinModule)

    useEffect(() => {
        getData()
        // eslint-disable-next-line
    }, [])

    const getData = () => {
        const initData = '1week'
        dispatch(saveData(initData))
    }

    const sortTable = (sortByObj) => {
        dispatch(sortData(sortByObj, dataToShow))
    }


    return (
        <div className="currency-list">
            {
                dataToShow &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                <button onClick={() => sortTable({ name: 'Date', type: 'bigNum' })}>△</button>
                                Date
                                <button onClick={() => sortTable({ name: 'Date', type: 'smallNum' })}>▽</button>
                            </th>
                            <th>
                                <button onClick={() => sortTable({ name: 'High', type: 'bigNum' })}>△</button>
                                High
                                <button onClick={() => sortTable({ name: 'High', type: 'smallNum' })}>▽</button>
                            </th>
                            <th>
                                <button onClick={() => sortTable({ name: 'Low', type: 'bigNum' })}>△</button>
                                Low
                                <button onClick={() => sortTable({ name: 'Low', type: 'smallNum' })}>▽</button>
                            </th>
                            <th>
                                <button onClick={() => sortTable({ name: 'Open', type: 'bigNum' })}>△</button>
                                Open
                                <button onClick={() => sortTable({ name: 'Open', type: 'smallNum' })}>▽</button>
                            </th>
                            <th>
                                <button onClick={() => sortTable({ name: 'Close', type: 'bigNum' })}>△</button>
                                Close
                                <button onClick={() => sortTable({ name: 'Close', type: 'smallNum' })}>▽</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataToShow.data.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{moment(item.Date).tz('UTC').format('MMM Do, YYYY')}</td>
                                    <td>{bitcoinService.formatMoney(item.High)}</td>
                                    <td>{bitcoinService.formatMoney(item.Low)}</td>
                                    <td>{bitcoinService.formatMoney(item.Open)}</td>
                                    <td>{bitcoinService.formatMoney(item.Close)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
