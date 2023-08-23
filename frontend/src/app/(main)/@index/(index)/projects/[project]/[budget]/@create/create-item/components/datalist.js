"use client";

export default function Datalist(props) {
  const uniqueElements = Array.from(new Set(props.list));
  return (
    <div className="relative flex flex-col px-2">
      <label className="font-light" htmlFor={props.label}>
        {props.label}:
      </label>
      <input
        list={`list-${props.label}`}
        id={`${props.label}`}
        name={`${props.label}`}
        onChange={props.onChange}
      />
      <datalist role="listbox" id={`list-${props.label}`}>
        {uniqueElements.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </datalist>
    </div>
  );
}
