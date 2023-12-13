"use client";

import { useEffect, useState } from "react";
import TagsLoader from "./TagsLoader";
import Plus from "@/components/svg/plus";
import TagNew from "./TagNew";
import Tag from "./Tag";

const Tags = ({ budget }) => {
  const [tags, setTags] = useState(null);
  console.log(tags);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/tag/${budget}`);
      const data = await res.json();
      setTags(data.tags);
    };
    loadData();
  }, []);

  const tagHandler = async (tag) => {
    console.log(tag);
    const res = await fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify({ budget, tag }),
    });
    const data = await res.json();
    console.log(res);
    console.log(data);
  };
  return (
    <div className="flex flex-row place-items-center gap-3">
      {tags ? (
        tags.map((tag) => <Tag key={tag.id} tag={tag} />)
      ) : (
        <TagsLoader />
      )}
      <TagNew tagHandler={tagHandler} />
    </div>
  );
};
export default Tags;
