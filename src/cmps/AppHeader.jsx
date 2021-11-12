import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../assets/imgs/btc.png";
import { bitcoinService } from "../services/bitcoinService";
import { saveData } from '../store/actions/bitcoinActions';


export const AppHeader = () => {

  const dispatch = useDispatch()

  const [webSocketData, setwebSocketData] = useState(null)
  const [fixDate, setFixDate] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    let ws = new WebSocket('wss://wstest.fxempire.com?token=btctothemoon');

    ws.onopen = function () {
      ws.send(JSON.stringify({ "type": "SUBSCRIBE", "instruments": ["cc-btc-usd-cccagg"] }))
    }

    ws.onmessage = function (msg) {
      const jsonData = JSON.parse(msg.data)
      const dataToShow = jsonData['cc-btc-usd-cccagg']
      const date = moment(dataToShow.lastUpdate).tz('UTC').format('MMM Do, YYYY hh:mm z')
      setFixDate(date)
      setwebSocketData(dataToShow)

      const color = dataToShow.change > 0 ? 'green' : 'red'
      setColor(color)
    }
    
    return (() => ws.close())

  }, [webSocketData])

  const changeDataToShow = (timePeriod) => {
    dispatch(saveData(timePeriod))
  }

  
  return (
    <div className="app-header layout">
      <header>
        <section className="logo">
          <article>
            <img src={Logo} alt="" />
            <h3>Bitcoin</h3>
          </article>
          <span className="border"></span>
          {webSocketData && <p>As of: {fixDate}</p>}
        </section>

        {!webSocketData && <article className="loader">•••</article>} {/* Loader */}

        {
          webSocketData &&
          <section>
            <article>
              <span>
                {
                  (webSocketData.change > 0) ?
                    <span className={color}>△</span> :
                    <span className={color}>▽</span>
                }
              </span>
              <h2>${bitcoinService.formatMoney(webSocketData.last)}</h2>
            </article>

            <aside>
              <p className={color}>{webSocketData.change.toFixed(2)}</p>
              <p className={color}>(% {webSocketData.percentChange})</p>
            </aside>
          </section>
        }
      </header>

      <nav>
        <NavLink activeClassName="active-nav" exact to="/Overview">Overview</NavLink>
        <NavLink activeClassName="active-nav" exact to="/">History</NavLink>
      </nav>

      <article className="btns">
        <button onClick={() => changeDataToShow('1min')}>1 Minute</button>
        <button onClick={() => changeDataToShow('5min')}>5 Minute</button>
        <button onClick={() => changeDataToShow('1hour')}>1 Hour</button>
        <button onClick={() => changeDataToShow('1week')}>1 week</button>
      </article>

    </div >
  )
}

