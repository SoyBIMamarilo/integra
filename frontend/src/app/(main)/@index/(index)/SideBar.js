import Link from "next/link";
import SideBarItem from "./SideBarItem";

const routes = [
  { href: "projects", name: "Proyectos", disabled: false },
  { href: "past-projects", name: "Históricos", disabled: false },
  { href: "reports", name: "Reportes", disabled: true },
  { href: "data-bases", name: "Bases de Datos", disabled: true },
];

const SideBar = () => {
  return (
    <div className="pr-24-4 sticky top-[10vh] z-40 box-border flex basis-1/6 flex-col items-stretch gap-1 bg-neutral-200 px-12  pt-12 text-neutral-600">
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
