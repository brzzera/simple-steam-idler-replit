const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./keep_alive.js');

// Variáveis de ambiente do Render
const sessionid = process.env.SESSIONID || 'SEU_SESSIONID';
const steamLoginSecure = process.env.STEAMLOGINSECURE || 'SEU_STEAMLOGINSECURE';
const shared_secret = process.env.SHARED_SECRET || 'SEU_SHARED_SECRET';

// Jogos que você quer idlar
const games = [730, 440, 570];  // AppIDs
const status = 1;  // 1 = online, 7 = invisible

const user = new steamUser();

// Logon usando sessão web + 2FA
user.logOn({
    accountName: null,
    webLogOn: true,
    machineName: 'SimpleIdler',
    webSession: {
        sessionid: sessionid,
        steamLoginSecure: steamLoginSecure
    },
    twoFactorCode: steamTotp.generateAuthCode(shared_secret)
});

user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on via session + 2FA');
    user.setPersona(status);
    user.gamesPlayed(games);
});

user.on('error', (err) => {
    console.error('Erro ao logar:', err);
});
