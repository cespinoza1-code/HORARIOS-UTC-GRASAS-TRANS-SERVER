require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// IDs de los canales
const CHANNEL_MEXICO = '1521244733714858176';
const CHANNEL_ARGENTINA = '1521244787414405120';
const CHANNEL_UTC = '1521244832889311403';

client.once('clientReady', async () => {

    console.log(`✅ Bot conectado como ${client.user.tag}`);

    try {

        const canalMexico = await client.channels.fetch(CHANNEL_MEXICO);
        const canalArgentina = await client.channels.fetch(CHANNEL_ARGENTINA);
        const canalUTC = await client.channels.fetch(CHANNEL_UTC);

        const ahora = new Date();

        const mexico = ahora.toLocaleTimeString('es-MX', {
            timeZone: 'America/Mexico_City',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const argentina = ahora.toLocaleTimeString('es-AR', {
            timeZone: 'America/Argentina/Buenos_Aires',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const utc = ahora.toLocaleTimeString('en-GB', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        await canalMexico.setName(`🇲🇽┃${mexico}`);
        await canalArgentina.setName(`🇦🇷┃${argentina}`);
        await canalUTC.setName(`🌍┃${utc}`);

        console.log("✅ Horarios actualizados correctamente.");

    } catch (error) {

        console.error("❌ Error:", error);

    } finally {

        client.destroy();
        process.exit(0);

    }

});

client.login(process.env.TOKEN).catch(error => {
    console.error("❌ Error al iniciar sesión:", error);
    process.exit(1);
});
