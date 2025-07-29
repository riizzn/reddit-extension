import { useFormData } from "@/entrypoints/hooks/formData";
import React from "react";
import Header from "../common/Header";
import Markdown from "react-markdown";

const CommentModal = ({
  post,
  comment,
  onRemove,
}: {
  post: any;
  comment: any[];
  onRemove: () => void;
}) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(false);
  const commentData = [
    {
      id: 1,
      author: "user123",
      comment:
        "This is a fantastic article! I learned so much about the subject.",
      score: 3,
    },
    {
      id: 2,
      author: "user123",
      comment:
        "This is a fantastic article! I learned so much about the subject.",
      score: 3,
    },
    {
      id: 3,
      author: "user123",
      comment:
        "This is a fantastic article! I learned so much about the subject.",
      score: 3,
    },
  ];
  return (
    <div className="w-[700px]  bg-gray-900">
      <div
        id="reddit-modal"
        className="flex flex-col rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] h-full overflow-hidden "
      >
        <Header
          title="Comments"
          count={commentData.length}
          onRemove={onRemove}
        />
        {loading && <p className="text-center text-white text-2xl">Loading.</p>}
        <div className="px-2 flex-1 overflow-y-auto m-4">
          <Markdown>
            {`# Hello world
This is a simple markdown example.
- Item 1
- Item 2
- Item 3`}
          </Markdown>
        </div>

        <div className="px-2 flex-1 overflow-y-auto">
          {commentData?.map((comm) => (
            <div
              key={comm.id}
              className="m-3 p-4 border border-gray-500  hover:border-gray-200 transition "
            >
              <div className="flex flex-col space-y-3 ">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-500 text-gray-100">
                    {comm.author}
                  </span>
                </div>

                <p className="text-sm line-clamp-2 text-gray-300">
                  {comm.comment}
                </p>
                <div className="mt-1 flex items-center">
                  <span className="text-sm  text-gray-500">
                    Score : {comm.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
