'use server';

import { queryBuilder } from '../../lib/planetscale';

async function updateSettings(
  guildId: string,
  switchState: boolean,
  command: string
) {
  console.log(`updating Settings: ${command} ${switchState}`);
  const Settings = await queryBuilder
    .updateTable(`${guildId}Settings` as any)
    .set({ turnedOn: switchState })
    .where('command', '=', `${command}`)
    .execute();
  return Settings;
}

export default updateSettings;
