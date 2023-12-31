import { Title, Text, Flex } from '@tremor/react';

import ServerSelection from './serverSelection';
import { queryBuilder } from '../lib/planetscale';
import { auth } from './auth';

async function fetchBotGuilds() {
  // Similar to fetchUserGuilds, but use the bot token
  // ...
  let botGuilds = fetch('https://discordapp.com/api/users/@me/guilds', {
    headers: {
      Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN,
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      return myJson;
    });
  return botGuilds;
}

async function fetchUserGuilds(accessToken: string) {
  let guilds = fetch('https://discordapp.com/api/users/@me/guilds', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  })
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (myJson) {
      // console.log(myJson);
      return myJson;
    });
  return guilds;
}
const texts = [
  'Aylani: Where Wisdom Meets Wonder – Unleash the God Within.',
  'Step into the mystical world of Aylani – a bot infused with the wisdom of a god and the innovation of technology. Packed with a plethora of features, Aylani offers a seamless blend of utility and magic, ensuring every interaction is a journey into a universe of boundless possibilities. From smart commands to automated tasks, let Aylani elevate your server to divine heights.',
  `Get ready to embark on an epic RPG adventure with Aylani! Dive into the rich lore of a realm where gods and adventurers wield magical powers. Join Aylani in her quest against the forces of darkness, unravel secrets, and challenge the gods themselves. This immersive RPG experience, woven into the fabric of our bot, is coming soon – prepare to be part of a story where your actions could shift the balance of an entire world.`,
  `Aylani thrives on the ideas and dreams of its community. Continually evolving, this bot is a testament to active development fueled by your imagination. Have an idea to expand Aylani's realm or enhance her features? Join our community forum where every suggestion is a step towards shaping the future of this mystical and technologically advanced universe. Together, we create a bot that not only serves but inspires.`,
  `This bot is still in early development, and this is just a beta version. If you'd have any suggestions for the bot, or the website, let me know in the support server`,
  `Currently looking for a designer. We are looking for designs for the bot character, as well as multiple other designs within the website or on the bot.`
];
const planets = [
  './assets/Planet1.png',
  './assets/Planet2.png',
  './assets/Planet3.png',
  './assets/Planet4.png'
];

export default async function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Flex
        flexDirection="col"
        alignItems="center"
        justifyContent="center"
        className="min-h-screen"
      >
        <Title className="text-center mb-8">
          Aylani (Currently Nature Bot)
        </Title>
        <Flex flexDirection="col" className="w-full space-y-8">
          {texts.map((item, index) => (
            <Flex
              key={item}
              flexDirection={index % 2 === 0 ? 'row' : 'row-reverse'}
              alignItems="center"
              className="gap-4 md:flex-col md:items-center"
            >
              {/* <img
                src={`../assets/planet${index + 1}.png`}
                className="md:w-full"
                // alt={`Description of image ${item}`}
              /> */}
              <Text className="md:w-full">{item}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Header */}

      {/* sort slogan */}

      {/* Features */}
      <Title>Features</Title>

      {/* Popular usage (stats: amount users, amount command usages, amount servers) */}

      {/* Footer */}
    </main>
  );
}
