import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=${API_KEY}`
        );
        const json = await response.json();
        if (json.Response === "Success") {
          setHistData(json.Data.Data);
        } else {
          console.error("API error:", json.Message);
          setHistData(null);
        }
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
        setHistData(null);
      }
    };

    if (symbol && market) {
      getCoinHist();
    }
  }, [symbol, market]);

  // Clean data: convert UNIX timestamp to human-readable date, reverse order for chart
  const cleanData = (data) => {
    if (!data) return [];
    return data
      .map((item) => ({
        time: new Date(item.time * 1000).toLocaleDateString("en-US"),
        "open price": item.open
      }))
  };

  return (
    <div>
      {histData ? (
        <>
          <br />
          <h2 style={{ textAlign: "center" }}>30-Day Price Data for {symbol}</h2>
          <LineChart
            width={800}
            height={600}
            data={cleanData(histData)}
            margin={{ top: 10, right: 10, left: 50, bottom: 80 }}
          >
            <Line
              type="monotone"
              dataKey="open price"
              stroke="#8884d8"
              activeDot={{ r: 6 }}
              dot={{ strokeWidth: 2 }}
            />
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="time" interval={3} angle={-45} textAnchor="end" height={70}>
              <Label
                value="Date"
                offset={-30}
                position="insideBottom"
                style={{ fontWeight: "bold" }}
              />
            </XAxis>
            <YAxis
              label={{
                value: "Price (USD)",
                angle: -90,
                position: "insideLeft",
                textAnchor: "middle",
                fontWeight: "bold",
                offset: -40
              }}
              domain={["auto", "auto"]}
              allowDataOverflow={true}
            />
            <Tooltip />
          </LineChart>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Loading chart data...</p>
      )}
    </div>
  );
};

export default CoinChart;