import ProjectSelector from "@/src/components/project-selector";
import ReduxProvider from "@/src/components/provider";

export default function (props) {
  return (
    <>
      <ReduxProvider>
        <ProjectSelector />
      </ReduxProvider>
      {props.children}
    </>
  );
}
