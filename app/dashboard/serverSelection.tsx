"use client";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Select, SelectItem, Text, Title } from "@tremor/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import DashboardCard from "./dashboardcard";
import fetchSettings from "./fetchSettings";
interface Setting {
  id: number;
  command: string;
  category: string;
  turnedOn: boolean;
}

export default async function ServerSelection({
  commonGuilds,
}: {
  commonGuilds: any;
}) {
  const [selectedGuild, setSelectedGuild] = useState(commonGuilds[0]);
  const [guildSettings, setGuildSettings] = useState<Setting[] | null>(null);

  const fetchGuildSettings = async (guildId: string) => {
    const settings = await fetchSettings(guildId);
    return settings;
  };

  useEffect(() => {
    if (commonGuilds.length > 0) {
      fetchGuildSettings(commonGuilds[0].id)
        .then((initialSettings) => {
          setGuildSettings(initialSettings);
        })
        .catch((error) => {
          console.error("Error fetching initial guild settings:", error);
        });
    }
  }, [commonGuilds]);

  useEffect(() => {
    fetchGuildSettings(selectedGuild.id)
      .then((settings) => {
        setGuildSettings(settings);
      })
      .catch((error) => {
        console.error("Error fetching guild settings:", error);
      });
  }, [selectedGuild]);
  return (
    <div className="max-w-full mx-auto space-y-6">
      <div className="max-w-sm">
        <Select
          value={selectedGuild}
          onValueChange={(guild) => {
            setSelectedGuild(guild); //getServerSettings(guild)
          }}
          enableClear={false}
        >
          {commonGuilds.map((guild: any, index: string) => (
            <SelectItem key={guild.id} value={guild}>
              {guild.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Title>{selectedGuild.name}</Title>
      {guildSettings ? (
        <DashboardCard settings={guildSettings} guild={selectedGuild.id} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
