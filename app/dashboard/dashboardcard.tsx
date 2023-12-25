"use client";

import { useEffect, useState } from "react";
import { Card, Metric, Text, Title, BarList, Flex, Grid , Switch } from "@tremor/react"; //
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
  const [commandState, setCommandState] = useState<CommandStates>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let initialState: CommandStates = {};
    data.forEach((item) => {
      item.data.forEach((command) => {
        initialState[command.name] = command.value;
      });
    });
    setCommandState(initialState);
    setIsLoading(false);
  }, []);

  const handleSwitchChange = (commandName: any, newValue: boolean) => {
    setCommandState((prevStates) => ({
      ...prevStates,
      [commandName]: newValue,
    }));
    updateSettings(guild, newValue, commandName);
  };

  if(isLoading){
    return(
      <div>
        loading...
      </div>
    )
  }

  return (
    <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
      {data.map((item) => (
        <Card key={item.category}>
          <Title>{item.category}</Title>

          {item.data.map((command) => (
            <Flex key={command.name} className="mt-6">
              <Text>{command.name}</Text>
              <Flex
                justifyContent="end"
                alignItems="baseline"
                className="space-x-2"
              >
                <Switch
                  key={command.name}
                  checked={commandState[command.name]}
                  onChange={(newValue) =>
                    handleSwitchChange(command.name, newValue)
                  }
                  className="relative inline-flex h-6 w-11 items-center rounded-full ui-checked:bg-blue-600 ui-not-checked:bg-gray-200 "
                >
                  <span className="sr-only">Enable command</span>
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition ui-checked:translate-x-6 ui-not-checked:translate-x-1" />
                </Switch>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
</svg>

              </Flex>
            </Flex>
          ))}
        </Card>
      ))}
    </Grid>
  );
}
