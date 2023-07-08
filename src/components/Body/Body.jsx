import React from "react";
import classes from "./Body.module.scss";
import axios from "axios";
import { useCityContext } from "../../hooks/useCityContext";
import {
  temp,
  precipitation,
  pressure,
  wind,
} from "../../assets/images/tempInfo";
import { MyButton } from "../UI";

// http://api.weatherapi.com/v1/forecast.json?key=bf4d47488de8477f8df103655232004&q=London&aqi=no&days=10

const Body = () => {
  const [data, setData] = React.useState(null);
  const [weatherDays, setWeatherDays] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [forWeek, setForWeek] = React.useState(true);
  const { city, days, setDays } = useCityContext();

  const getWeekDay = (dayDate) => {
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Су", "Во"];
    const date = new Date(dayDate);
    const today = new Date();
    const day = +dayDate.split("-")[2];

    if (today.getDay() === day) {
      return "Сегодня";
    } else if (Math.abs(today.getDay() - day) === 1) {
      return "Завтра";
    }
    return weekDays[date.getDay()];
  };

  const getWeeksDayString = (dayDate) => {
    const date = new Date(dayDate);
    const dates = date.toDateString().split(" ");

    return `${dates[2]} ${dates[1]}`;
  };

  const getCurrentWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=bf4d47488de8477f8df103655232004&q=${city}&aqi=no`
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherDays = async () => {
    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=bf4d47488de8477f8df103655232004&q=${city}&days=${days}&aqi=no&alerts=no`
      );
      console.log(res)
      if (res.status === 200) {
        setWeatherDays(res.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  React.useEffect(() => {
    if (city) {
      getCurrentWeather();
    }
  }, [city, days]);

  React.useEffect(() => {
    if (days) {
      getWeatherDays();
    }
  }, [days]);

  const handleDays = (daysCount) => {
    setDays(daysCount);
  };

  return (
    <section className="section">
      <div className="container">
        {loading ? (
          <h1>Loading...</h1>
        ) : data ? (
          <>
            <div className={classes.currentWeather}>
              <div className={classes.tempInfo}>
                <div className={classes.top}>
                  <div>
                    <h1>{data.current.temp_c}°</h1>
                    <p>Сегодня</p>
                  </div>
                  <img src={data.current.condition.icon} />
                </div>
                <div className={classes.location}>
                  <p>Время: {data.location.localtime.split(" ")[1]}</p>
                  <p>Город: {data.location.name}</p>
                </div>
              </div>
              <div className={classes.moreInfo}>
                <div>
                  <img src={temp} />
                  <span className={classes.text}>Температура</span>
                  <span className={classes.desc}>
                    {data.current.temp_c}° - ощущается как{" "}
                    {data.current.feelslike_c}°
                  </span>
                </div>
                <div>
                  <img src={pressure} />
                  <span className={classes.text}>Давление </span>
                  <span className={classes.desc}>
                    {data.current.pressure_mb} мм ртутного столба - нормальное
                  </span>
                </div>
                <div>
                  <img src={precipitation} />
                  <span className={classes.text}>Осадки</span>
                  <span className={classes.desc}>
                    {data.current.condition.text}
                  </span>
                </div>
                <div>
                  <img src={wind} />
                  <span className={classes.text}>Ветер</span>
                  <span className={classes.desc}>
                    {data.current.wind_mph} м/с юго-запад - легкий ветер
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.daysWeather}>
              <div className={classes.daysTop}>
                <div className={classes.selectDays}>
                  <MyButton
                    onClick={(e) => {
                      handleDays(7);
                      setForWeek(true);
                    }}
                    data-active={forWeek ? "active" : ""}
                  >
                    На неделю
                  </MyButton>
                  <MyButton
                    onClick={(e) => {
                      handleDays(10);
                      setForWeek(false);
                    }}
                    data-active={forWeek ? "" : "active"}
                  >
                    На 10 дней
                  </MyButton>
                </div>
                <MyButton
                  onClick={() => {
                    handleDays(7);
                    setForWeek(true);
                  }}
                >
                  Отменить
                </MyButton>
              </div>

              <div className={classes.weatherCards}>
                {weatherDays.forecast.forecastday.map((item) => (
                  <div className={classes.weatherCard} key={item.date_epoch}>
                    <h1 className={classes.title}>{getWeekDay(item.date)}</h1>
                    <p className={classes.day}>
                      {getWeeksDayString(item.date)}
                    </p>
                    <img src={item.day.condition.icon} />
                    <h2 className={classes.tempMax}>
                      {item.day.maxtemp_c > 0
                        ? `+${item.day.maxtemp_c}`
                        : `-${item.day.maxtemp_c}`}
                    </h2>
                    <h3 className={classes.tempMin}>
                      {item.day.mintemp_c > 0
                        ? `+${item.day.mintemp_c}`
                        : `-${item.day.mintemp_c}`}
                    </h3>
                    <p className={classes.desc}>{item.day.condition.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </section>
  );
};

export default Body;
