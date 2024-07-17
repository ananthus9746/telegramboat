

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you got from BotFather
const token = '6597976400:AAFrSTBTWJ3oeZ3wW31RUr2G6tuXRxa2p38';
const bot = new TelegramBot(token, { polling: true });

// Store user data in memory (consider using a database for production)
let users = {};

// Bot commands
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!users[userId]) {
        users[userId] = {
            joinDate: new Date().getFullYear(),
            friends: [],
        };
    }

    bot.sendMessage(chatId, `Welcome! You joined Telegram in ana123 ${users[userId].joinDate}.`);
});

bot.onText(/\/addfriend (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const friendId = match[1];

    if (!users[userId]) {
        users[userId] = {
            joinDate: new Date().getFullYear(),
            friends: [],
        };
    }

    if (!users[userId].friends.includes(friendId)) {
        users[userId].friends.push(friendId);
        bot.sendMessage(chatId, `Added friend with ID: ${friendId}`);
    } else {
        bot.sendMessage(chatId, `Friend with ID: ${friendId} is already in your friend list.`);
    }
});

bot.onText(/\/showfriends/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (!users[userId]) {
        users[userId] = {
            joinDate: new Date().getFullYear(),
            friends: [],
        };
    }

    const friends = users[userId].friends.join(', ');
    bot.sendMessage(chatId, `Your friends: ${friends || 'No friends added yet.'}`);
});

// Express server setup
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Telegram Bot is running.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
