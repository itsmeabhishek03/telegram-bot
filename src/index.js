//import all the dependencies.
const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const axios = require("axios");

//rapid api for delhi's current temprature.
const options = {
  method: "GET",
  url: "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather",
  params: { city: "delhi" },
  headers: {
    "X-RapidAPI-Key": "7641462945msh42a9e6bef914015p1488acjsn7ba77d956c11",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

//create a bot using the token provided by botfather.
const TOKEN = process.env.TOKEN;
const bot = new telegramBot(TOKEN, { polling: true });

//this block of code will run everytime when bot will recieve any message.
let arr = [];
bot.on("message", async (message) => {
  const id = message.from.id;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    //if message has been already send for a particular chat id don't do anything and return.
    if (element === id) {
      return;
    }
  }
  arr.push(id);
  let res = "";
  res = await axios.request(options).catch((error) => {
    console.error(error);
  });
  //run helper function for the first time.
  helper(id);
  //setInterval for every hour.
  setInterval(function () {
    helper(id);
  }, 1000 * 60 * 60);
});

//helper function will return delhi's current temprature to user.
const helper = async (id) => {
  let res = "";
  res = await axios.request(options).catch((error) => {
    console.error(error);
  });
  bot.sendMessage(
    id,
    "delhi current temperature is " + res.data.temp.toString() + "°C"
  );
};

//just do npm start in terminal and you are good to go.
