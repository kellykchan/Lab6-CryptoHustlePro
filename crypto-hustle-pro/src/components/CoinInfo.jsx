import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const API_KEY = import.meta.env.VITE_APP_API_KEY

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null)

  useEffect(() => {
    const getCoinPrice = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
          API_KEY
      )

      const json = await response.json()
      setPrice(json)
    }
    getCoinPrice().catch(console.error)
  }, [symbol])

  return (
    <li className="main-list" key={symbol}>
      <Link to={`/coinDetails/${symbol}`}>
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
        <span className="coin-name">{name}</span>
        {price && price.USD ? (
          <span className="coin-price">${price.USD} USD</span>
        ) : (
          <span className="coin-price">Loading...</span>
        )}
      </Link>
    </li>
  )
}

export default CoinInfo