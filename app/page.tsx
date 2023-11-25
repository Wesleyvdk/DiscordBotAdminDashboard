import { Fragment } from 'react';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
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

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const session = await auth();
  const accessToken = session?.accessToken ?? '';
  const search = searchParams.q ?? '';
  const VampLevels = await queryBuilder
    .selectFrom('VampLevels')
    .select(['id', 'name', 'level', 'exp'])
    .where('name', 'like', `%${search}%`)
    .orderBy('level', 'desc')
    .execute();

  let userGuilds = await fetchUserGuilds(accessToken);
  let botGuilds = await fetchBotGuilds();
  const commonGuilds = userGuilds.filter((userGuild: any) =>
    botGuilds.some((botGuild: any) => botGuild.id === userGuild.id)
  );

  // const leaderboard = await queryBuilder
  //   .selectFrom(guild.id)
  //   .select(['id', 'name', 'level', 'exp'])
  //   .where('name', 'like', `%${search}%`)
  //   .orderBy('level', 'desc')
  //   .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a planetscale database.</Text>

      <ServerSelection commonGuilds={commonGuilds} />
      <Search />
      <Card className="mt-6">
        <UsersTable users={VampLevels} />
      </Card>
    </main>
  );
}
