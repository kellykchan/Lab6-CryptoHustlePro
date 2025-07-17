import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "./CoinChart";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail() {
  const { symbol } = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const details = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const description = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
        );

        const detailsJson = await details.json();
        const descripJson = await description.json();

        setFullDetails({
          numbers: detailsJson.DISPLAY?.[symbol]?.USD,
          textData: descripJson.Data?.[symbol],
        });
      } catch (error) {
        console.error("Failed to fetch coin details:", error);
      }
    };

    getCoinDetail();
  }, [symbol]);

  if (!fullDetails) return <p>Loading coin details...</p>;

    return (
    <div className="coin-detail-container">
        <h1>{fullDetails.textData?.FullName}</h1>
        <img
        className="images"
        src={`https://www.cryptocompare.com${fullDetails.textData?.ImageUrl}`}
        alt={`Icon for ${symbol}`}
        />
        <div className="coin-detail-description">
            {fullDetails.textData?.Description || "No description available."}
        </div>
        
        <table>
            <tbody>
                <tr>
                <th>Launch Date</th>
                <td>{fullDetails.textData?.AssetLaunchDate || "N/A"}</td>
                </tr>
                <tr>
                <th>Website</th>
                <td>
                    {fullDetails.textData?.WebsiteUrl ? (
                    <a href={fullDetails.textData.WebsiteUrl} target="_blank" rel="noopener noreferrer">
                        {fullDetails.textData.WebsiteUrl}
                    </a>
                    ) : "N/A"}
                </td>
                </tr>
                <tr>
                <th>Whitepaper</th>
                <td>
                    {fullDetails.textData?.WhitePaper?.Link ? (
                    <a href={fullDetails.textData.WhitePaper.Link} target="_blank" rel="noopener noreferrer">
                        Whitepaper
                    </a>
                    ) : "N/A"}
                </td>
                </tr>
                <tr>
                <th>Monetary Symbol</th>
                <td>{symbol}</td>
                </tr>
                <tr>
                <th>Market</th>
                <td>{fullDetails.numbers?.MARKET || "USD"}</td>
                </tr>
                <tr>
                <th>Last Transaction</th>
                <td>{fullDetails.numbers?.LASTUPDATE || "N/A"}</td>
                </tr>
                <tr>
                <th>Last Transaction Value</th>
                <td>{fullDetails.numbers?.LASTVOLUME || "N/A"}</td>
                </tr>
                <tr>
                <th>Volume (24hr)</th>
                <td>{fullDetails.numbers?.VOLUME24HOUR || "N/A"}</td>
                </tr>
                <tr>
                <th>Today's Open Price</th>
                <td>{fullDetails.numbers?.OPEN24HOUR || "N/A"}</td>
                </tr>
                <tr>
                <th>Highest Price Today</th>
                <td>{fullDetails.numbers?.HIGHDAY || "N/A"}</td>
                </tr>
                <tr>
                <th>Lowest Price Today</th>
                <td>{fullDetails.numbers?.LOWDAY || "N/A"}</td>
                </tr>
                <tr>
                <th>Change From Previous Day</th>
                <td>{fullDetails.numbers?.CHANGEPCT24HOUR ? fullDetails.numbers.CHANGEPCT24HOUR + "%" : "N/A"}</td>
                </tr>
                <tr>
                <th>Market Cap</th>
                <td>{fullDetails.numbers?.MKTCAP || "N/A"}</td>
                </tr>
            </tbody>
            </table>

        <div>This coin uses the algorithm: {fullDetails.textData?.Algorithm || "N/A"}</div>
        <div>Price: {fullDetails.numbers?.PRICE || "N/A"}</div>
        <div className="coin-chart-container">
            <CoinChart
                symbol={symbol}
                market={fullDetails.numbers?.MARKET || "CCCAGG"} // fallback market if none found
            />
        </div>
    </div>
    );
}

export default CoinDetail;