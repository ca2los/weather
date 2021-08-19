let world_api = 'https://restcountries.eu/rest/v2/all';
let weather_api = 'e1c67989512630b23c7847c2bfb40b49';

function world() {

    document.getElementById('submit').addEventListener('click', function(event){
        event.preventDefault();

        // Retrieve the INPUT data FROM the USER
        let country = document.getElementById('name').value;

        // API: Rest Countries
        fetch(world_api).then(function(response){
            return response.json();
        }).then(function (data){

            // FOR IN iterates over all enumerable properties keyed by strings
            for (let destination in data) {
                let name = data[destination].name;
                let translations = data[destination].translations;
                let capital = data[destination].capital;
                let altSpellings = data[destination].altSpellings;
                let region = data[destination].region;
                let subregion = data[destination].subregion;
                let population = data[destination].population;
                let demonym = data[destination].demonym;
                let timezones = data[destination].timezones;
                let borders = data[destination].borders;
                let currencies = data[destination].currencies;
                let languages = data[destination].languages;
                let flag = data[destination].flag;

                // IF statement for matching the country's name in the top 12 languages
                if (country === name
                    || country === translations.br || country === translations.de
                    || country === translations.es || country === translations.fa
                    || country === translations.fr || country === translations.hr
                    || country === translations.it || country === translations.ja
                    || country === translations.nl || country === translations.pt
                ){
                    // THEN retrieve the most important DATA
                    let selected = {
                        name:name,
                        translations:translations,
                        capital:capital,
                        altSpellings:altSpellings,
                        region:region,
                        subregion:subregion,
                        population:population,
                        demonym:demonym,
                        timezones:timezones,
                        borders:borders,
                        currencies:currencies[0].code,
                        languages:languages[0].name,
                        flag:flag
                    };
                    console.log(selected);

                    // API: Open Weather
                    // GET the Latitude and Longitude of the country WITH the name in english
                    let weather_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + selected.name.toLowerCase() + ',' + selected.altSpellings[0].toLowerCase() + '&APPID=' + weather_api;
                    fetch(weather_url).then(function (response) {
                        return response.json();
                    }).then(function (data){
                        let location = {
                            coordinates_latitude:data.coord.lat,
                            coordinates_longitude:data.coord.lon
                        }

                        // THEN retrieve the forecast from Latitude and Longitude
                        let coordinates = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + location.coordinates_latitude + '&lon=' + location.coordinates_longitude + '&exclude=hourly,daily&appid=' + weather_api;
                        fetch(coordinates).then(function (response) {
                            return response.json();
                        }).then(function (data){
                            console.log(data);
                            let forecast = {
                                day_time:data.current.dt,
                                sunrise:data.current.sunrise,
                                sunset:data.current.sunset,
                                temp:data.current.temp,
                                feels_like:data.current.feels_like,
                                humidity:data.current.humidity,
                                wind_speed:data.current.wind_speed,
                                uvi:data.current.uvi,
                                weather_main:data.current.weather[0].main,
                                weather_description:data.current.weather[0].description
                            }
                            console.log(forecast);

                            // FORMAT: Day Time && Sunrise && Sunset = TIME
                            let today = moment(forecast.day_time);
                            let today_hour = today.format('LT');
                            let today_sunrise = moment(forecast.sunrise);
                            let today_sunrise_hour = today_sunrise.format('h:mm:ss');
                            let today_sunset = moment(forecast.sunset);
                            let today_sunset_hour = today_sunset.format('h:mm:ss');

                            // DYNAMIC (CREATE) HTML: WHEN the data is retrieved THEN create the objects
                            let tag_section_a = document.createElement('section');
                            let tag_div_a0 = document.createElement('div');
                            let tag_img_a0 = document.createElement('img');
                            tag_div_a0.textContent = today_hour;
                            document.body.children[1].children[1].children[0].appendChild(tag_section_a).setAttribute('class','flag');
                            document.body.children[1].children[1].children[0].children[0].appendChild(tag_img_a0).setAttribute('src',selected.flag);
                            document.body.children[1].children[1].children[0].children[0].appendChild(tag_div_a0).setAttribute('class','country_hour');

                            let tag_section_b = document.createElement('section');
                            let tag_div_b0 = document.createElement('div');
                            let tag_div_b1 = document.createElement('div');
                            let tag_div_b2 = document.createElement('div');
                            let tag_div_b3 = document.createElement('div');
                            let tag_div_b4 = document.createElement('div');
                            tag_div_b0.textContent = selected.name;
                            tag_div_b1.textContent = 'Capital is ' + selected.capital;
                            //tag_div_b2.textContent = 'Translation: ' + selected.translations;
                            tag_div_b3.textContent = selected.altSpellings;
                            tag_div_b4.textContent = 'Citizenship: ' + selected.demonym;
                            document.body.children[1].children[1].children[0].appendChild(tag_section_b).setAttribute('class','country');
                            document.body.children[1].children[1].children[0].children[1].appendChild(tag_div_b0).setAttribute('class','country_name');
                            document.body.children[1].children[1].children[0].children[1].appendChild(tag_div_b1).setAttribute('class','country_capital');
                            document.body.children[1].children[1].children[0].children[1].appendChild(tag_div_b2).setAttribute('class','country_name_translation');
                            document.body.children[1].children[1].children[0].children[1].appendChild(tag_div_b3).setAttribute('class','country_name_spellings');
                            document.body.children[1].children[1].children[0].children[1].appendChild(tag_div_b4).setAttribute('class','country_demonym');

                            let tag_section_c = document.createElement('section');
                            let tag_div_c0 = document.createElement('div');
                            let tag_div_c1 = document.createElement('div');
                            let tag_div_c2 = document.createElement('div');
                            let tag_div_c3 = document.createElement('div');
                            let tag_div_c4 = document.createElement('div');
                            let tag_div_c5 = document.createElement('div');
                            let tag_div_c6 = document.createElement('div');
                            tag_div_c0.textContent = selected.region;
                            tag_div_c1.textContent = 'Region is ' + selected.subregion;
                            tag_div_c2.textContent = selected.population + ' Population';
                            tag_div_c3.textContent = selected.timezones;
                            tag_div_c4.textContent = 'Sunrise: ' + today_sunrise_hour;
                            tag_div_c5.textContent = 'Sunset: ' + today_sunset_hour;
                            tag_div_c6.textContent = 'Frontiers with ' + selected.borders;
                            document.body.children[1].children[1].children[0].appendChild(tag_section_c).setAttribute('class','geography');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c0).setAttribute('class','country_region');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c1).setAttribute('class','country_subregion');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c2).setAttribute('class','country_population');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c3).setAttribute('class','country_timezones');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c4).setAttribute('class','country_sunrise');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c5).setAttribute('class','country_sunset');
                            document.body.children[1].children[1].children[0].children[2].appendChild(tag_div_c6).setAttribute('class','country_borders');

                            let tag_section_d = document.createElement('section');
                            let tag_div_d0 = document.createElement('div');
                            let tag_div_d1 = document.createElement('div');
                            tag_div_d0.textContent = 'Currency ' + selected.currencies;
                            tag_div_d1.textContent = 'Language is ' + selected.languages;
                            document.body.children[1].children[1].children[0].appendChild(tag_section_d).setAttribute('class','specifics');
                            document.body.children[1].children[1].children[0].children[3].appendChild(tag_div_d0).setAttribute('class','country_currencies');
                            document.body.children[1].children[1].children[0].children[3].appendChild(tag_div_d1).setAttribute('class','country_languages');

                            let tag_section_e = document.createElement('section');
                            let tag_div_e0 = document.createElement('div');
                            let tag_div_e1 = document.createElement('div');
                            let tag_div_e2 = document.createElement('div');
                            let tag_div_e3 = document.createElement('div');
                            let tag_div_e4 = document.createElement('div');
                            let tag_div_e5 = document.createElement('div');
                            let tag_div_e6 = document.createElement('div');
                            tag_div_e0.textContent = forecast.weather_main;
                            tag_div_e1.textContent = forecast.weather_description;
                            tag_div_e2.textContent = (forecast.temp - 273.15).toFixed(2) + ' ºC';
                            tag_div_e3.textContent = 'Humidity: ' + forecast.humidity + "%";
                            tag_div_e4.textContent = 'Wind speed: ' + forecast.wind_speed + " m/s";
                            tag_div_e5.textContent = 'Feels like ' + (forecast.feels_like - 273.15).toFixed(2) + ' ºC';
                            tag_div_e6.textContent = 'UV ' + forecast.uvi;
                            document.body.children[1].children[1].children[0].appendChild(tag_section_e).setAttribute('id','weather');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e0).setAttribute('class','country_main');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e1).setAttribute('class','country_description');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e2).setAttribute('class','country_temperature');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e5).setAttribute('class','country_feels');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e3).setAttribute('class','country_humidity');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e4).setAttribute('class','country_windspeed');
                            document.body.children[1].children[1].children[0].children[4].appendChild(tag_div_e6).setAttribute('class','country_uvi');
                        })
                    })
                }
            }
        });

        // ON CLICK modify the TAG styles
        document.querySelector('main').setAttribute('style','width:auto;min-height:auto;flex-direction:unset;justify-content:unset;margin:0auto;padding:unset;text-align:unset;align-items:unset;display:unset;');
        document.querySelector('form').setAttribute('style','margin: 130px auto 0;')
    });
}
world();

function clear_results() {
    document.getElementById('submit').addEventListener('click', function(){
        document.querySelector('.container').innerHTML = "";
    });
}
clear_results();