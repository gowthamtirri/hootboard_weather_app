import "./home.css";
import Card from "./Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [location, setLocation] = useState({ city: "", lat: "", lng: "" });

  const { city, lat, lng } = location;

  const navigate = useNavigate();

  const getPostion = (position) => {
    setLocation((prevState) => ({
      ...prevState,
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }));
  };
  useEffect(() => {
    if (lat !== "" && lng !== "") {
      navigate(`/weatherInfo/unknown/${lat}/${lng}`);
    }
  }, [city, lat, lng, navigate]);

  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPostion);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="home">
      <Card>
        <div className="title">
          <h3>Weather App</h3>
        </div>
        <form action={`/weatherInfo/${city}`} className="inputBox">
          <input
            onChange={(e) =>
              setLocation((prevState) => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            value={city}
            type="text"
            placeholder="Enter City Name"
          />
        </form>
        <div className="divider">
          <div className="line"></div>
          <p> or</p> <div className="line"></div>
        </div>
        <div className="btn">
          <button onClick={handleClick}>Get Device Location</button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
