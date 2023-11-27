"use client";

import { createClient } from "@supabase/supabase-js";
// import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import { supabaseOptions } from "@/util/supabase";
import SuspenseComponent from "./testLoading";
import TestComponent from "./TestComponent";

export default async function OptionalSession(params) {
  return (
    <Accordion.Root type="single" collapsible={true}>
      <Accordion.Item value="item-1">
        <Accordion.Header>
          <Accordion.Trigger className="AccordionTrigger">
            <span>Trigger text button</span>
            {/* <ChevronDownIcon className="AccordionChevron" aria-hidden /> */}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Accordion Content</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
