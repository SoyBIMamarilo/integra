import Link from "next/link";
import SideBarItem from "./SideBarItem";

const routes = [
  { href: "projects", name: "Proyectos" },
  { href: "reports", name: "Reportes" },
  { href: "data-bases", name: "Bases de Datos" },
];

const SideBar = () => {
  return (
    <div className="sticky top-[10vh] z-40 box-border flex h-[90vh] min-h-full basis-1/6  flex-col items-start gap-1 bg-neutral-200 p-4 pl-10 pt-12 text-neutral-600">
      {routes.map((route) => (
        <SideBarItem key={route.href} href={route.href} name={route.name} />
      ))}
    </div>
  );
};

export default SideBar;
