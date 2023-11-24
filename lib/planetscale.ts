import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface User {
    id: Generated<number>;
    name: string;
    level: string;
    exp: string;
}
interface Command {
    command_id: number;
    command_name: string;
    category: string;
    usage_count: number;
    last_used: Date;
}

interface Database {
    VampLevels: User;
    bot_commands: Command;
    // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        url: process.env.DATABASE_URL
    })
});