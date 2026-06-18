import { ChevronDownIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

interface Set {
  id: string;
  code: string;
  icon_svg_uri: string;
  name: string;
  released_at: string;
  set_type: string;
  card_count: number;
}

function SetBlock({ set }: { set: Set }) {
  return (
    <div className="bg-gray-800 border border-purple-400 rounded p-2 w-full">
      <div className="grid grid-cols-3 items-center px-2">
        <p className="text-sm font-bold text-purple-300">{set.code.toUpperCase()}</p>
        <p className="text-sm font-bold text-purple-300 capitalize text-center">{set.set_type}</p>
        <p className="text-sm font-bold text-purple-300 text-right">{set.card_count} cards</p>
      </div>
      <p className="text-gray-400 text-xs mt-1 pl-2">
        {new Date(set.released_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
}

export function ReleasedSets({ setGroups }: { setGroups: Set[][] }) {
  console.log("First group first item icon:", setGroups[0]?.[0]?.icon_svg_uri);
  return (
    <section>
      <h2 className="text-2xl font-bold text-purple-400 mb-4">
        Released Sets ({setGroups.length})
      </h2>
      <div className="grid gap-4">
       {setGroups.length > 0 ? (
  setGroups.map((setGroup) => (
    /* 1. Collapsible is the root wrapper for the element */
    <Collapsible 
      key={setGroup[0].id} 
      className="w-full group rounded-md transition-all duration-300 ease"
    >
      {/* 2. Trigger is right inside, rendering AS the clickable Card */}
      <CollapsibleTrigger asChild className="w-full cursor-pointer text-left block select-none">
        <Card className="bg-gray-900 border border-purple-500 rounded-lg p-4 hover:bg-gray-800 transition-all w-full">
          <CardContent className="flex items-center p-0 w-full">
            <div className="flex text-xl font-bold text-purple-400 items-center hover:text-purple-500 transition-colors duration-300
            justify-between">
              <div className="flex items-center justify-center w-8 h-6 shrink-0">
                <Image
                  src={`${setGroup[0].icon_svg_uri}`}
                  alt="set img"
                  width={20}
                  height={20}
                  className="brightness-0 invert mr-2 object-contain"
                />
              </div>
                
              <span>{setGroup[0].name}</span>{" "}
              <span className="text-l text-purple-300 ml-2">
                {setGroup[0].code.toUpperCase()}
              </span> 
              <span className="text-l text-purple-300 ml-2">
                {setGroup.length} variant{setGroup.length !== 1 ? "s" : ""}
              </span>
            </div>
            <ChevronDownIcon className="transition-transform duration-300 ml-auto group-data-[state=open]:rotate-180 ease-in-out text-purple-400 shrink-0" />
          </CardContent>
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden animate-collapsible-slide">
        <div className="mt-4 px-1">
          <div className="grid gap-2">
            {setGroup.map((set) => (
              <SetBlock key={set.id} set={set} />
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ))
) : (
  <p className="text-gray-400">No released sets found.</p>
)}
      </div>
    </section>
  );
}
