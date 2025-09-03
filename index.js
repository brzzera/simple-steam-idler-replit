const steamUser = require('steam-user');
const keep_alive = require('./keep_alive.js');

// Coloque seus cookies de sessão aqui ou use variáveis de ambiente
const sessionid = process.env.SESSIONID || 'SEU_SESSIONID';
const steamLoginSecure = process.env.STEAMLOGINSECURE || 'SEU_STEAMLOGINSECURE';

// Jogos que você quer idlar
const games = [730, 440, 570];  // AppIDs
const status = 1;  // 1 = online, 7 = invisible

const user = new steamUser();

// Logon usando sessão web
user.logOn({
    accountName: null,   // não precisa de username
    webLogOn: true,
    machineName: 'SimpleIdler',
    webSession: {
        sessionid: sessionid,
        steamLoginSecure: steamLoginSecure
    }
});

user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on via session cookies');
    user.setPersona(status);
    user.gamesPlayed(games);
});

// Eventos de erro para debug
user.on('error', (err) => {
    console.error('Erro ao logar:', err);
});
