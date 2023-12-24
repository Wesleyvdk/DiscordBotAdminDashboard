'use server';

import { queryBuilder } from '../../lib/planetscale';

async function fetchSettings(guildId: string) {
  const Settings = await queryBuilder
    .selectFrom(`${guildId}Settings` as any)
    .select(['id', 'command', 'category', 'turnedOn'])
    .execute();
  return Settings;
}

export default fetchSettings;
