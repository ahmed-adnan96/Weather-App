let search = document.querySelector("input");
let show = document.querySelector(".showDay");
let locationTemp = document.querySelector(".city-temp");
let iconTemp = document.querySelector("#today-icon");
let copRighter = document.querySelector(".copyright");
copRighter.textContent = `Copyright © ${new Date().getFullYear()} Designed By Menna Eladl . All rights reserved`;
search.addEventListener("keydown", function () {
  getLocation(search.value);
});

let days,
  humidity,
  city,
  rain,
  tempFirstDay,
  textDetails,
  wind,
  today,
  tomorrow,
  dayAfterTommorrow;
async function getLocation(cityTemp) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=21342cbe50624a1aa60161046232308&q=${cityTemp}&days=3&aqi=no&alerts=no`
  );
  let x = await response.json();
  getFirstDat(x);
  days = x.forecast.forecastday;
  console.log(days);
  getDay(days);
  showDay();
}
function getDay(arr) {
  let dayDetails = [];

  arr.forEach((el) => {
    dayDetails.push(el);
  });
  [today, tomorrow, dayAfterTommorrow] = dayDetails;
  console.log(today.day.daily_will_it_rain);
}
function getFirstDat(response) {
  city = response.location.name;

  tempFirstDay = response.current.temp_c;
  humidity = response.current.humidity;
  wind = response.current.wind_kph;

  rain = response.current.wind_dir;

  icon = response.current.condition.icon;

  textDetails = response.current.condition.text;
}
function showDay() {
  let dateToday = new Date(today.date);
  let dateTommorow = new Date(tomorrow.date);
  let dateAfterTommorow = new Date(dayAfterTommorrow.date);
  show.innerHTML = ` <div class="col-md-4">
  <div class="temp-card shadow rounded-3">
    <div
      class="title-temp rounded-top-3 d-flex justify-content-between px-4 align-items-center"
    >
      <p>${dateToday.toLocaleDateString("en-us", {
        weekday: "long",
      })}</p>
      <p>${dateToday.toLocaleDateString("en-us", {
        day: "2-digit",
      })} ${dateToday.toLocaleDateString("en-us", {
    month: "short",
  })}</p>
    </div>
    <div class="body-temp text-white">
      <h4 class="city-temp pt-5 ps-4 fw-bold">${city}</h4>
      <div
        class="city-degree d-flex justify-content-between align-items-center px-4"
      >
        <div class="temp-degree">
          <h2>${tempFirstDay}&deg;C</h2>
        </div>
        <div class="icon-temp">
          <img
            id="today-icon"
            width="90"
            src="https:${icon}"
          />
        </div>
      </div>
      <p class="small text-muted ps-4">${textDetails}</p>
      <ul
        class="list-unstyled d-flex justify-content-evenly w-75 align-items-center pb-3"
      >
        <li>
          <span><i class="fas fa-umbrella pr-1"></i> </span>
          ${humidity}%
        </li>
        <li>
          <span><i class="fas fa-wind pl-3 pr-1"></i> </span>
          ${wind}km/h
        </li>
        <li>
          <span><i class="far fa-compass pl-3 pr-1"></i></span>
          ${rain}
        </li>
      </ul>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div
    class="temp-card text-center hover-main-color second-color shadow rounded-3"
  >
    <div
      class="title-temp rounded-top-3 d-flex justify-content-between px-4 align-items-center"
    >
    <p>${dateTommorow.toLocaleDateString("en-us", {
      weekday: "long",
    })}</p>
    <p>${dateTommorow.toLocaleDateString("en-us", {
      day: "2-digit",
    })} ${dateTommorow.toLocaleDateString("en-us", {
    month: "short",
  })}</p>
    </div>
    <div class="body-temp text-white">
      <div class="icon-temp pt-4">
        <img
          class="nextDay-icon"
          width="90"
          src="https:${tomorrow.day.condition.icon}"
        />
      </div>
      <h3 class="fw-bolder">${tomorrow.day.maxtemp_c}&deg;C</h3>
      <p class="fw-bolder">${tomorrow.day.mintemp_c}&deg;C</p>
      <p class="small text-muted pt-3 pb-4">${tomorrow.day.condition.text}</p>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div
    class="temp-card text-center hover-main-color second-color shadow rounded-3"
  >
    <div
      class="title-temp rounded-top-3 d-flex justify-content-between px-4 align-items-center"
    >
    <p>${dateAfterTommorow.toLocaleDateString("en-us", {
      weekday: "long",
    })}</p>
    <p>${dateAfterTommorow.toLocaleDateString("en-us", {
      day: "2-digit",
    })} ${dateAfterTommorow.toLocaleDateString("en-us", {
    month: "short",
  })}</p>
    </div>
    <div class="body-temp text-white">
      <div class="icon-temp pt-4">
        <img
          class="nextDay-icon"
          width="90"
          src="https:${dayAfterTommorrow.day.condition.icon}"
        />
      </div>
      <h3 class="fw-bolder">${dayAfterTommorrow.day.maxtemp_c}&deg;C</h3>
      <p class="fw-bolder">${dayAfterTommorrow.day.mintemp_c}&deg;C</p>
      <p class="small text-muted pt-3 pb-4">${
        dayAfterTommorrow.day.condition.text
      }</p>
    </div>
  </div>
</div>`;
}
