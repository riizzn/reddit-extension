import React, { useState } from "react";
import Header from "../common/Header";
import { useFormData } from "@/entrypoints/hooks/formData";

const PostModal = ({
  posts,
  onRemove,
}: {
  posts: any;
  onRemove: () => void;
}) => {
  const {formData} = useFormData();
  const [loading, setLoading] = useState(false);
  console.log("formdata", formData);
  const postData = [
    {
      id: 1,
      tag: "Technology",
      title: "Revolutionizing AI with Quantum Computing",
      description:
        "Explore the groundbreaking advancements in combining artificial intelligence and quantum computing.",
      score: 450,
      comments: 23,
    },
    {
      id: 2,
      tag: "Science",
      title: "The Mysteries of Dark Matter Unveiled",
      description:
        "A deep dive into the latest research and theories surrounding dark matter.",
      score: 320,
      comments: 15,
    },
     {
      id: 3,
      tag: "Science",
      title: "The Mysteries of Dark Matter Unveiled",
      description:
        "A deep dive into the latest research and theories surrounding dark matter.",
      score: 320,
      comments: 15,
    },
     {
      id: 4,
      tag: "Science",
      title: "The Mysteries of Dark Matter Unveiled",
      description:
        "A deep dive into the latest research and theories surrounding dark matter.",
      score: 320,
      comments: 15,
    },
  ];
  return (
    <div className="w-[700px]  bg-gray-900">
      <div
        id="reddit-modal"
        className="flex flex-col rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] h-full overflow-hidden "
      >
        <Header title="Posts" count={postData.length} onRemove={onRemove} />
        {loading && <p className="text-center text-white text-2xl">Loading.</p>}
        <div className="px-2 flex-1 overflow-y-auto">
          {postData?.map((post) => (
            <div
              key={post.id}
              className="m-3 p-4 border border-gray-500  hover:border-gray-200 transition "
            >
              <div className="flex flex-col space-y-3 ">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-500 text-gray-100">
                    {post.tag}
                  </span>
                </div>
                <h3 className="text-white text-xl font-semibold mt-1">
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-2 text-gray-300">
                  {post.description}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm ">Score : {post.score}</span>
                  <span className="text-sm ">{post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostModal;
