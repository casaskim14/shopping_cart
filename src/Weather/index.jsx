import React, { PureComponent, createRef } from 'react';
import clsx from 'clsx';
import './weather.css';
import WeatherForm from './weatherForm';
import WeatherInfo from './weatherInfo';
import WeatherFilter from './weatherFilter';
// import TodoFilter from './todoFilter';

export default class Weather extends PureComponent {
  state = {
    weatherDetails: [],
    viewDetails: false,
    error: null,
  };

  searchCity = createRef();

  // async componentDidMount() {
  //     this.loadWeather();
  // }

  // loadWeather = async cityName => {
  //     try {

  //     } catch (error) {
  //         this.setState({ error });
  //     }
  // };

  // search = (value) => {
  //     this.setState({cityName: value});
  // };
  //   cityName = () => {x = _this.searchCity.current.value};

  searchCityWeather = async event => {
    try {
      event.preventDefault();

      const searchCity = this.searchCity.current.value;

       let url = 'http://localhost:4000/weatherList';

      url += `?cityName=${searchCity}`;

      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json);
      }

      this.setState(
        { weatherDetails: json, viewDetails: true },
        // () => {
        //     this.searchCity.current.value = '';
        // },
      );
      // this.setState(
      //     ({ cityName: this.searchCity.current.value }),
      //     () => {
      //         this.searchCity.current.value = '';
      //     },
      // );
      // this.setState(
      //     // ({ weatherDetails }) => ({
      //     //     weatherDetails: [...weatherDetails],
      //     // }),
      //     () => {
      //         this.searchCity.current.value = '';
      //     },
      // );
    } catch (error) {
      this.setState({ error });
    }
  };

  clearWeather = () => {
    this.setState(
      () => ({
        weatherDetails: [],
        viewDetails: false,
      }),
      () => {
        this.searchCity.current.value = '';
      },
    );
  };
  

  render() {
    console.log('weather render');
    const { error, weatherDetails, viewDetails } = this.state;
    // if (error) {
    //   return <h1>{error.message}</h1>;
    // }
    console.log(weatherDetails);
    return (
      <div
        className={clsx('weather', {
          ' justify-center': weatherDetails.length == 0,
        })}
      >
        <h1 className=" weather__title">Weather Info</h1>
        <WeatherForm
          searchCityWeather={this.searchCityWeather}
          weatherDetails={weatherDetails}
          ref={this.searchCity}
        />
        {viewDetails && (
          <div>
            <WeatherInfo
              weatherDetails={weatherDetails}
              clearWeather={this.clearWeather}
            />
            {/* <button type="button" className="todo_form__btn mb-[20px]" onClick={this.clearWeather}>Clear Data</button> */}
          </div>
        )}
        {/* <WeatherInfo weatherDetails={weatherDetails} /> */}
      </div>
    );
  }
}
