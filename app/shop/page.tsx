'use server';

import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { queryBuilder } from '../../lib/planetscale';

export default async function Shop() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a planetscale database.</Text>
    </main>
  );
}
