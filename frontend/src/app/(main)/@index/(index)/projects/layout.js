import ProjectSelector from "@/app/(main)/@index/(index)/projects/components/project-selector";

import { routeActions } from "@/store/route-slice";
import store from "@/store";

export default function (props) {
  // store.dispatch(
  //   routeActions.resetRoute([{ link: "/projects", name: "Projectos" }])
  // );
  // console.log(store.getState().routes.route);
  return (
    <>
      {/* <ProjectSelector /> */}
      <>{props.children}</>
    </>
  );
}
