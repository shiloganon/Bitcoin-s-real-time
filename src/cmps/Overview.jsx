import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'


export const Overview = () => {

    const history = useHistory()
    const { dataToShow } = useSelector(state => state.bitcoinModule)

    useEffect(() => {
        if (!dataToShow) history.push('/')
    }, [])

    return (
        <div className="overview">
            {
                dataToShow &&
                <AreaChart width={1000} height={550} data={dataToShow.data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Close" stroke="blue" fillOpacity={1} fill="#0078d11a" />
                </AreaChart>
            }
        </div>
    )
}
