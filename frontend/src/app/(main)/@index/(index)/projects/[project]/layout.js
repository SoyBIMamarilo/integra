import ProjectRoute from "./components/project-route";

export default function (props) {
  return (
    <>
      <ProjectRoute />
      {props.create}
      {props.children}
    </>
  );
}
