import "./weatherInfo.css";
import { useParams, Link } from "react-router-dom";
import Card from "./Card";
import { useEffect, useState } from "react";
import Loading from "./Loading";

const WeatherInfo = () => {
  const { city, latitude, longitude } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [weatherInfo, setWeatherInfo] = useState({});

  const celcius = (weatherInfo?.main?.temp - 273.15).toFixed(0);
  const tempInfo = weatherInfo?.weather?.[0]?.main;
  const cityName = weatherInfo.name;
  const feelsLike = (weatherInfo?.main?.feels_like - 273.15).toFixed(0);
  const humidity = weatherInfo.main?.humidity;
  console.log(weatherInfo);
  console.log(cityName, tempInfo);

  useEffect(() => {
    let url;
    if (city === "unknown") {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`;
    }
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setError(true);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherInfo(data);
        setLoading(false);
      })
      .catch((error) => alert(error));
  }, [city, longitude, latitude]);

  return (
    <div className="weatherInfo">
      {error ? (
        <Card>
          {" "}
          <div className="title">
            <h3>
              <Link to={"/"}> &larr; Weather App</Link>
            </h3>
          </div>
          <div style={{ padding: "20px" }} className="card-content">
            <p>Something Went Wrong! Please check the city name</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="title">
            <h3>
              <Link to={"/"}> &larr; Weather App</Link>
            </h3>
          </div>
          <div className="card-content">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h1>{celcius}&deg; C</h1>
                <p>{tempInfo}</p>
                <p>{cityName}</p>
                <div className="info">
                  <div className="feelsLike">
                    <p>{feelsLike}&deg; C</p> <p>Feels Like</p>
                  </div>
                  <div className="humidity">
                    <p>{humidity} %</p>
                    <p>Humidity</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default WeatherInfo;
