import app from "./app.js";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import 'dotenv/config'
import axios from "axios";

const bot = new Telegraf(process.env.WEATHER_BOT_API)
bot.start = ((ctx) =>
    ctx.reply("Enter the city name")

)

bot.on(message('text'), (ctx) => {
    const cityName = ctx.text;
    if (typeof (cityName) === 'string')
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API}`)
            .then(response => {

                const celcius = response.data.main.temp - 273.15
                ctx.reply(`Temp is: ${celcius.toFixed(2)} °C`)
            })
            .catch(err => {
                ctx.reply(`${err.response.data.message}`)
            })

})


bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

app.listen(process.env.PORT, () => {
    console.log(`Server has been connected successfully on ${process.env.PORT}`);
})