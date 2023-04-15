import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import WeatherInfo from "./components/WeatherInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/weatherInfo/:city?/:latitude?/:longitude?"
          element={<WeatherInfo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
