import { createClient } from "@supabase/supabase-js";
// import { cookies, headers } from "next/headers";
import { Suspense } from "react";
import Alert from "@/components/alert";

import { supabaseOptions } from "@/util/supabase";
import SuspenseComponent from "./testLoading";
import TestComponent from "./TestComponent";

export default async function OptionalSession(params) {
  return (
    <>
      <Alert />
      <TestComponent />
    </>
  );
}
