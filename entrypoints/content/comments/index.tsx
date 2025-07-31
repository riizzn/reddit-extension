import { useFormData } from "@/entrypoints/hooks/formData";
import React from "react";
import Header from "../common/Header";
import Markdown from "react-markdown";
import { IComment, IPost } from "../scripts/scrap";
import Search from "../common/Search";
import CustomToast from "../common/CustomToast";
import axios from "axios";

const CommentModal = ({
  post,
  comments,
  onRemove,
}: {
  post: IPost;
  comments: IComment[];
  onRemove: () => void;
}) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<string | null>(null);
  const handleCommentClick = (comment: IComment) => {
    if (comment.permalink) {
      window.open(comment.permalink, "_blank", "noopener,noReferrer");
    }
  };

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setGeminiResponse("");
    const url = formData?.endpoint;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `
This is the prompt: ${searchQuery}
This is the dataset of comments in js array: '${JSON.stringify(comments)}'
This is the dataset of post in js array: '${JSON.stringify(post)}'

Now based on this dataset of comments under the post,
summarize the overall discussion briefly in 2-3 lines.

Also return:
- The best comment (most insightful or most upvoted).
- The worst comment (most downvoted, unhelpful, or controversial).
          `,
            },
          ],
        },
      ],
    };
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": formData?.apiKey, // Add the API key header here
        },
      });
      const data = response.data?.candidates?.[0].content?.parts?.[0].text;

      console.info(data);
      setGeminiResponse(data);
    } catch (error) {
      CustomToast({
        message: "api error generating response",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[700px]  bg-gray-900">
      <div
        id="reddit-modal"
        className="flex flex-col rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] h-full overflow-hidden "
      >
        <Header title="Comments" count={comments.length} onRemove={onRemove} />
        <Search handleSearch={handleSearch} />
        {loading && <p className="text-center text-white text-2xl">Loading...</p>}
        <div className="px-2 flex-1 overflow-y-auto m-4 text-white text-sm">
          <Markdown>{geminiResponse}</Markdown>
        </div>

        <div className="px-2 flex-1 overflow-y-auto">
          {comments?.map((comm) => (
            <div
              key={comm.id}
              onClick={() => handleCommentClick(comm)}
              className="m-3 p-4 border border-gray-500  hover:border-gray-200 transition rounded-xl  "
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
