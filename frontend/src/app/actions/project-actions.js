"use server";

import { getAuth } from "@/components/cookieSetter";

export const fetchProjects = async () => {
  const res = await fetch("http://localhost:8080/proyectos", {
    headers: {
      access_token: await getAuth(process.env.DB_HOST, process.env.DB_ANON_KEY),
    },
  });
  if (!res.ok) {
    return [];
  }
  const json = await res.json();
  return json;
};

export const fetchProject = async (projectId) => {
  const res = await fetch(`http://localhost:8080/proyectos/proyecto/${projectId}`, {
    headers: {
      access_token: await getAuth(process.env.DB_HOST, process.env.DB_ANON_KEY),
    },
  });
  if (!res.ok) {
    return {}
  }
  const json = await res.json();
  return json;
};
