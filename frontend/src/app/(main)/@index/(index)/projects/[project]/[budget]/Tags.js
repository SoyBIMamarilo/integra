"use client";

import { useEffect, useState } from "react";
import TagsLoader from "./TagsLoader";
import Plus from "@/components/svg/plus";
import TagNew from "./TagNew";
import Tag from "./Tag";

const Tags = ({ budget }) => {
  const [tags, setTags] = useState(null);
  const [newTag, setNewTag] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`/api/tag/${budget}`);
      const data = await res.json();
      setTags(data.tags);
    };
    loadData();
  }, [budget, newTag]);

  const tagHandler = async (tag) => {
    const res = await fetch("/api/tag", {
      method: "POST",
      body: JSON.stringify({ budget, tag }),
    });
    const data = await res.json();
    setNewTag(tag);
  };

  const tagUpdateHandler = async (id, text) => {
    const res = await fetch("/api/tag", {
      method: "PUT",
      body: JSON.stringify({ id, text }),
    });
    if (res.status == 200) {
      console.log("BEFORE FETCH");
      setNewTag(text);
    }
  };
  const tagDeleteHandler = async (id) => {
    const res = await fetch("/api/tag", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    if (res.status == 200) {
      setNewTag(id);
    }
  };

  return (
    <div className="flex flex-row place-items-center gap-3">
      {tags ? (
        tags
          .sort((a, b) => a.id - b.id)
          .map((tag) => (
            <Tag
              tagUpdateHandler={tagUpdateHandler}
              tagDeleteHandler={tagDeleteHandler}
              key={tag.id}
              tag={tag}
            />
          ))
      ) : (
        <TagsLoader />
      )}
      <TagNew tagHandler={tagHandler} />
    </div>
  );
};
export default Tags;
