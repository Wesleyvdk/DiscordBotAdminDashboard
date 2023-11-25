import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { queryBuilder } from '../lib/planetscale';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const VampLevels = await queryBuilder
    .selectFrom('VampLevels')
    .select(['id', 'name', 'level', 'exp'])
    .where('name', 'like', `%${search}%`)
    .orderBy('level', 'desc')
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a planetscale database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={VampLevels} />
      </Card>
    </main>
  );
}
