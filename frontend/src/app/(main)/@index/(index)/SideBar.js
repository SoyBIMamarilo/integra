import Link from "next/link";
import SideBarItem from "./SideBarItem";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabaseOptions } from "@/util/supabase";
import { headers, cookies } from "next/headers";

const SideBar = async () => {
  const supabase = createServerComponentClient({ cookies }, supabaseOptions);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("usuario_rol")
    .select("rol")
    .eq("user_id", user.id);

    console.log(data)

  const routes = [
    { href: "/projects", name: "Proyectos", disabled: false },
    { href: "/past-projects", name: "Históricos", disabled: false },
    { href: "/reports", name: "Reportes", disabled: true },
    { href: "/data-bases", name: "Bases de Datos", disabled: true },
    {
      href: "/user-admin",
      name: "Agregar usuario",
      disabled: data[0].rol !== "GERENTE",
    },
  ];

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
