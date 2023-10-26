import Link from "next/link";

import SideBarItem from "./SideBarItem";

const routes = [
  { href: "/projects", name: "Proyectos", disabled: false },
  { href: "/past-projects", name: "Históricos", disabled: false },
  // { href: "/reports", name: "Reportes", disabled: true },
  // { href: "/data-bases", name: "Bases de Datos", disabled: true },
];

const SideBar = () => {
  return (
    <div className="sticky top-[10vh] z-40 box-border flex basis-0 flex-col items-stretch gap-1 bg-gray3 px-14 pt-12 text-blackA12">
      {routes.map((route) => (
        <SideBarItem
          key={route.href}
          href={route.href}
          name={route.name}
          disabled={route.disabled}
        />
      ))}
    </div>
  );
};

export default SideBar;
