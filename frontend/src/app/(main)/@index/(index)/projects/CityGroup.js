// "use client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { supabaseOptions } from "@/util/supabase";

const CityGroup = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);
  const { data: cities, error } = await supabase.rpc("ciudades_con_proyectos");
  console.log("CityGroup", cities);
  return (
    // <Accordion.Root
    //   className="w-[300px] rounded-md bg-mauve6 shadow-[0_2px_10px] shadow-black/5"
    //   type="single"
    //   defaultValue="item-1"
    //   collapsible
    // >
    <>
      {cities.map((city) => (
        <div>Test</div>
        // <Accordion.Item value="item-1">
        //   <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        //   <Accordion.Content>
        //     Yes. It adheres to the WAI-ARIA design pattern.
        //   </Accordion.Content>
        // </Accordion.Item>
      ))}
    </>
    // </Accordion.Root>
  );
};

export default CityGroup;
