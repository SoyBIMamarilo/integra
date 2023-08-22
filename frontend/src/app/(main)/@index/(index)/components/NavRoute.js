"use client";

import { useState } from "react";
import Link from "next/link";

import store from "@/store";

const NavRoute = () => {
  const [routes, setRoutes] = useState(store.getState().routes.route);
  console.log(routes);
  const unsubscribe = store.subscribe(() =>
    console.log("State after dispatch: ", store.getState())
  );
  if (routes.length == 0) {
    return null;
  }

  return (
    <div className="h-12 w-full bg-green-400">
      {routes.map((route) => (
        <Link className="text-xs" href={route.link}>
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default NavRoute;
