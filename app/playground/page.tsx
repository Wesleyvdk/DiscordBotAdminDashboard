import { queryBuilder } from '../../lib/planetscale';
import CategoryCard from './categorycard';

interface Command {
  command_id: number;
  command_name: string;
  category: string;
  usage_count: number;
  last_used: Date;
}

export default async function PlaygroundPage() {
  const commands: Command[] = await queryBuilder
    .selectFrom('bot_commands')
    .select([
      'command_id',
      'command_name',
      'category',
      'usage_count',
      'last_used'
    ])
    .orderBy('usage_count', 'desc')
    .execute();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <CategoryCard commands={commands} />
    </main>
  );
}
