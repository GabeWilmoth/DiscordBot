const Discord = require('discord.js');
const rp = require('request-promise');
const fs = require("fs");
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const bot = new Discord.Client();
const package = require("./package.json");
// const TOKEN = 'NTEzMDk0MTA2OTYwODg3ODM4.DtDAXQ.Y8PkQpj0Kx6Zm44Ijn9Ap5g7-zQ';
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
    // This is where we'll put our code.
    if (message.content.indexOf(package.prefix) !== 0) return;

    const args = message.content.slice(package.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('Pong!');
    } else
        if (command === 'blah') {
            message.channel.send('Meh.');
        }
    if (command === 'op.gg') {
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



        // var i = 1

        // puppeteer
        //     .launch()
        //     .then(function (browser) {
        //         return browser.newPage();
        //     })
        //     .then(function (page) {
        //         return page.goto(urlWithName).then(function () {
        //             return page.content();
        //         });
        //     })
        //     .then(function (html) {
        //         console.log("Name: " + urlAdd);

        //         $('.ranking', html).each(function () {
        //             console.log("Ladder Rank: " + $(this).text());
        //         });

        //         $('.tierRank', html).each(function () {
        //             console.log("Tier Rank: " + $(this).text());
        //         });

        //         $('.wins', html).each(function () {
        //             //console.log($(this).text());
        //             if (i == 1) {
        //                 var wins1 = ($(this).text());
        //                 console.log(wins1);
        //                 i++;
        //             } else {
        //                 var wins2 = ($(this).text());
        //             }

        //         });

        //         $('.losses', html).each(function () {
        //             if (i == 2) {
        //                 var losses1 = ($(this).text());
        //                 console.log(losses1);
        //                 i++;
        //             } else {
        //                 var losses2 = ($(this).text());
        //             }
        //         });

        //         $('.winratio', html).each(function () {
        //             if (i == 3) {
        //                 var winratio1 = ($(this).text());
        //                 console.log(winratio1);
        //                 i++;
        //             } else {
        //                 var winratio2 = ($(this).text());
        //             }
        //         });

        //         // $('.ChampionName', html).each(function () {
        //         //     if (i == 4) {
        //         //         var ChampionName1 = ($(this).text());
        //         //         console.log(ChampionName1);
        //         //         i++;
        //         //     } else if (i == 5) {
        //         //         var ChampionName2 = ($(this).text());
        //         //         console.log(ChampionName2);
        //         //         i++;
        //         //     } else if (i == 6) {
        //         //         var ChampionName3 = ($(this).text());
        //         //         console.log(ChampionName3);
        //         //         i++;
        //         //     } else{

        //         //     }
        //         // });

        //         $('.ChampionName', html).each(function () {
        //             if (i == 4) {
        //                 var ChampionName1 = ($(this).text());
        //                 console.log(ChampionName1);
        //                 i++;
        //             } else if (i == 5) {
        //                 var ChampionName2 = ($(this).text());
        //                 console.log(ChampionName2);
        //                 i++;
        //             } else if (i == 6) {
        //                 var ChampionName3 = ($(this).text());
        //                 console.log(ChampionName3);
        //                 i++;
        //             } else{

        //             }
        //         });

        //         //For some reason it is stoping the flow of data after displaying 3 champ names.

        //         $('.ChampionMinionKill tip tpd-delegation-uid-1', html).each(function () {
        //             console.log("FUCK")
        //             if (i == 7) {
        //                 var ChampionCS1 = ($(this).text());
        //                 console.log(ChampionCS1);
        //                 i++;
        //             } else if (i == 8) {
        //                 var ChampionCS2 = ($(this).text());
        //                 console.log(ChampionCS2);
        //                 i++;
        //             } else if (i == 9) {
        //                 var ChampionCS3 = ($(this).text());
        //                 console.log(ChampionCS3);
        //                 i++;
        //             } else {

        //             }
        //         });

        //         $('.KDA', html).each(function () {
        //             if (i == 10) {
        //                 var PersonalKDA1 = ($(this).text());
        //                 console.log(PersonalKDA1);
        //                 i++;
        //             } else if (i == 11) {
        //                 var PersonalKDA2 = ($(this).text());
        //                 console.log(PersonalKDA2);
        //                 i++;
        //             } else if (i == 12) {
        //                 var PersonalKDA3 = ($(this).text());
        //                 console.log(PersonalKDA3);
        //                 i++;
        //             } else {

        //             }
        //         });

        //         $('.Kill', html).each(function () {
        //             if (i == 13) {
        //                 var Kill1 = ($(this).text());
        //                 console.log(Kill1);
        //                 i++;
        //             } else if (i == 14) {
        //                 var Kill2 = ($(this).text());
        //                 console.log(Kill2);
        //                 i++;
        //             } else if (i == 15) {
        //                 var Kill3 = ($(this).text());
        //                 console.log(Kill3);
        //                 i++;
        //             } else {

        //             }
        //         });

        //         $('.Death', html).each(function () {
        //             if (i == 16) {
        //                 var Death1 = ($(this).text());
        //                 console.log(Death1);
        //                 i++;
        //             } else if (i == 17) {
        //                 var Death2 = ($(this).text());
        //                 console.log(Death2);
        //                 i++;
        //             } else if (i == 18) {
        //                 var Death3 = ($(this).text());
        //                 console.log(Death3);
        //                 i++;
        //             } else {

        //             }
        //         });

        //         $('.Assist', html).each(function () {
        //             if (i == 19) {
        //                 var Assist1 = ($(this).text());
        //                 console.log(Assist1);
        //                 i++;
        //             } else if (i == 20) {
        //                 var Assist2 = ($(this).text());
        //                 console.log(Assist2);
        //                 i++;
        //             } else if (i == 21) {
        //                 var Assist3 = ($(this).text());
        //                 console.log(Assist3);
        //                 i++;
        //             } else {

        //             }
        //         });

        //     })
        //     .catch(function (err) {
        //         //handle error
        //     });
    }

    if (command === 'ingame') {

    }
});

bot.on('ready', function () {
    console.log("Ready");
});

bot.login(package.token);