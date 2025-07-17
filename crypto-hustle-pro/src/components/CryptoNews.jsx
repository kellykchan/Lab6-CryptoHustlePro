import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CryptoNews() {
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const getNewsArticles = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=` + API_KEY
      );
      const json = await response.json();
      setNewsList(json.Data);
    };
    getNewsArticles().catch(console.error);
  }, []);

  return (
    <div className="crypto-news-container">
      <ul className="side-list">
        {newsList &&
          newsList.map((article) => (
            <li className="news-article" key={article.title}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CryptoNews;