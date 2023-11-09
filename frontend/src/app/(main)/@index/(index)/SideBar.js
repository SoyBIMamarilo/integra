
import SideBarItem from "./SideBarItem";


const routes = [
  { href: "/projects", name: "Proyectos", disabled: false },
  { href: "/past-projects", name: "Históricos", disabled: false },
  { href: "/reports", name: "Reportes", disabled: true },
  { href: "/data-bases", name: "Bases de Datos", disabled: true },
  { href: "/viewer", name: "Visor Amarilo", disabled: false }
];

const SideBar = () => {
  return (
    <div className="sticky top-[10vh] z-40 box-border flex basis-1/6 flex-col items-stretch gap-1 bg-neutral-200 px-16 pt-12 text-xl text-neutral-600">

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
