const Discord = require('discord.js');
const rp = require('request-promise');
const fs = require("fs");
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const bot = new Discord.Client();
const package = require("./package.json");
var url = 'http://na.op.gg/summoner/userName=';


bot.on('message', function (message) {
    if (message.content.startsWith == 'OP') {
        message.reply('Hello There!');

        puppeteer
            .launch()
            .then(function (browser) {
                return browser.newPage();
            })
            .then(function (page) {
                return page.goto(url).then(function () {
                    return page.content();
                });
            })
            .then(function (html) {
                $('.wins', html).each(function () {
                    console.log($(this).text());
                    message.reply($(this).text());
                });
                $('.losses', html).each(function () {
                    console.log($(this).text());
                });
                $('.winratio', html).each(function () {
                    console.log($(this).text());
                });
                $('.LeagueName', html).each(function () {
                    console.log($(this).text());
                });
                $('.tierRank', html).each(function () {
                    console.log($(this).text());
                });
                $('.ChampionName', html).each(function () {
                    console.log($(this).text());
                });

                // console.log($('.wins', html).text());
            })
            .catch(function (err) {
                //handle error
            });
    }
});

bot.on("message", message => {
    let ImgExists = false;
    if (message.author.bot) return;

    if (message.content.indexOf(package.prefix) !== 0) return;

    const args = message.content.slice(package.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!');
    } else if (command === 'blah') {
        message.channel.send('Meh.');
    }
    else if (command === 'op.gg') {
        let urlAdd = "";
        for (i = 0; i < args.length; i++) {
            urlAdd = urlAdd + args[i];
        }
        urlWithName = url + urlAdd;
        console.log(urlWithName);

        const puppeteer = require('puppeteer');

        async function run() {
            // let browser = await puppeteer.launch();//({ headless: false });
            const browser = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                args: ['--disable-setuid-sandbox', '--no-sandbox']
            })
            let page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(urlWithName);
            await page.screenshot({ path: './image.png', clip: { x: 460, y: 600, width: 300, height: 1033 } });
            message.channel.send(urlAdd + " Stats", { files: ["image.png"] });
            console.log("here");
            browser.close();
        }

        async function deleteFile() {
            console.log("here2");
            const file = 'image.png';

            await fs.access(file, fs.constants.F_OK, (err) => {
                `${file} ${err ? ImgExists = false : ImgExists = true}`;
            });
            if (ImgExists) {
                fs.unlink('image.png', (err) => {
                    if (err) throw err;
                    console.log('image.png was deleted');
                });
            }
        }

        run();
        deleteFile()
    } else if (command === 'ingame') {
        let inGame = false;
        let urlAdd = "";
        for (i = 0; i < args.length; i++) {
            urlAdd = urlAdd + args[i];
        }
        urlWithName = url + urlAdd;
        console.log(urlWithName);

        const puppeteer = require('puppeteer');

        async function run() {
            // let browser = await puppeteer.launch();//({ headless: false });
            const browser = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                args: ['--disable-setuid-sandbox', '--no-sandbox']
            })
            let page = await browser.newPage();

            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(urlWithName);

            await page.click('.SpectateTabButton');
            if (await page.$('.SpectateTabButton.SpectateTabButtonActive') !== null) console.log('found'), inGame = true;
            else console.log('not found'), inGame = false;
            if (inGame) {
                await page.waitFor(4000);
                await page.screenshot({ path: './imageInGame.png', clip: { x: 460, y: 690, width: 1000, height: 480 } });
                message.channel.send(urlAdd + " Stats", { files: ["imageInGame.png"] });
                console.log("here");
            } else if (inGame == false) {
                message.channel.send(urlAdd + " is not in game");
            }
            browser.close();
        }

        async function deleteFile() {
            console.log("here2");
            const file = 'imageInGame.png';

            await fs.access(file, fs.constants.F_OK, (err) => {
                `${file} ${err ? ImgExists = false : ImgExists = true}`;
            });
            if (ImgExists) {
                fs.unlink('imageInGame.png', (err) => {
                    if (err) throw err;
                    console.log('imageInGame.png was deleted');
                });
            }
        }

        run();
        deleteFile()
    } else if (command === 'help') {
        message.channel.send('Meh.');
    }
});

bot.on('ready', function () {
    console.log("Ready");
});

bot.login(package.token);