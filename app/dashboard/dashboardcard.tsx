"use client";

import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { Card, Metric, Text, Title, BarList, Flex, Grid } from "@tremor/react";
import updateSettings from "./updateSettings";

interface Settings {
  id: number;
  command: string;
  category: string;
  turnedOn: boolean;
}

interface CommandSummary {
  name: string;
  value: boolean;
}

interface CategoryData {
  category: string;
  data: CommandSummary[];
}
type CommandStates = {
  [key: string]: number; // Or the appropriate type of 'command.value'
};
export default async function DashboardCard({
  settings,
  guild,
}: {
  settings: Settings[];
  guild: string;
}) {
  const categoryMap = new Map<string, { settings: CommandSummary[] }>();

  settings.forEach((command) => {
    if (!categoryMap.has(command.category)) {
      categoryMap.set(command.category, { settings: [] });
    }
    const categoryData = categoryMap.get(command.category);
    categoryData?.settings.push({
      name: command.command,
      value: command.turnedOn,
    });
  });

  const data: CategoryData[] = Array.from(categoryMap).map(
    ([category, { settings }]) => ({
      category: category,
      data: settings,
    })
  );
  type CommandStates = {
    [key: string]: boolean; // or number, depending on the type of 'command.value'
  };
  let initialState: CommandStates = {};
  data.forEach((item) => {
    item.data.forEach((command) => {
      initialState[command.name] = command.value;
    });
  });
  const [commandState, setCommandState] = useState<CommandStates>(initialState);

  const handleSwitchChange = (commandName: any, newValue: boolean) => {
    setCommandState((prevStates) => ({
      ...prevStates,
      [commandName]: newValue,
    }));
    updateSettings(guild, newValue, commandName);
  };

  return (
    <Grid numItemsSm={2} numItemsLg={3} className="max-w-full gap-6">
      {data.map((item) => (
        <Card key={item.category}>
          <Title>{item.category}</Title>
          {item.data.map((command) => (
            <div key={command.name}>
              <Flex className="mt-6">
                <Text>{command.name}</Text>
              </Flex>
              <Flex
                justifyContent="start"
                alignItems="baseline"
                className="space-x-2 ml-8"
              >
                <Switch
                  key={command.name}
                  checked={commandState[command.name]}
                  onChange={(newValue) =>
                    handleSwitchChange(command.name, newValue)
                  }
                  className="relative inline-flex h-6 w-11 items-center rounded-full ui-checked:bg-blue-600 ui-not-checked:bg-gray-200 right-0"
                >
                  <span className="sr-only">Enable command</span>
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition ui-checked:translate-x-6 ui-not-checked:translate-x-1" />
                </Switch>
              </Flex>
            </div>
          ))}
        </Card>
      ))}
    </Grid>
  );
}
