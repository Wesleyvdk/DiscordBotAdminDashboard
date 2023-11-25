'use client';
import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Select, SelectItem, Text, Title } from '@tremor/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

export default function ServerSelection({
  commonGuilds
}: {
  commonGuilds: any;
}) {
  const [selectedGuild, setSelectedGuild] = useState(commonGuilds[0]);

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <Select
        value={selectedGuild}
        onValueChange={(guild) => setSelectedGuild(guild)}
        enableClear={false}
      >
        {commonGuilds.map((guild: any, index: string) => (
          <SelectItem key={guild.id} value={guild}>
            {guild.name}
          </SelectItem>
        ))}
      </Select>
      <Title>{selectedGuild.name}</Title>
    </div>
  );
}
