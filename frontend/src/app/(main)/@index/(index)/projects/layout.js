import ProjectSelector from "@/src/components/project-selector";

export default function (props) {
  return (
    <>
      <ProjectSelector />
      <>{props.children}</>
    </>
  );
}
