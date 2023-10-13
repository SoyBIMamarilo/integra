const Block = (props) => {
  return !props.blocked ? (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      className="mx-1 h-6 w-6 fill-none stroke-neutral-500 stroke-1 hover:stroke-neutral-900 hover:stroke-[1.25]"
    >
      <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ) : (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 90"
      className="hover:stroke-neutral-1000 mx-1 h-6 w-6 fill-none stroke-black stroke-2 hover:stroke-[3]"
    >
      <g data-name="Group">
        <path
          data-name="Path"
          d="M75.2,42.4H35.1V29.3a14.9,14.9,0,0,1,29.7,0h6a20.9,20.9,0,0,0-41.7,0V42.4H24.8a3,3,0,0,0-3,3V88.5a3,3,0,0,0,3,3H75.2a3,3,0,0,0,3-3V45.4A3,3,0,0,0,75.2,42.4Z"
        />
      </g>
    </svg>
  );
};

export default Block;
