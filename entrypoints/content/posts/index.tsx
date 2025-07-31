import React, { useState } from "react";
import Header from "../common/Header";
import { useFormData } from "@/entrypoints/hooks/formData";
import { extractJsonListFromMarkdown, IPost } from "../scripts/scrap";
import Search from "../common/Search";
import content from "..";
import axios from "axios";
import CustomToast from "../common/CustomToast";
import toast from "react-hot-toast";

const PostModal = ({
  posts,
  onRemove,
}: {
  posts: IPost[];
  onRemove: () => void;
}) => {
  const { formData } = useFormData();
  const [loading, setLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<IPost[]>([]);
  const handlePostClick = (post: IPost) => {
    
    if (post.link) {
      window.open(post.link, "_blank", "noopener,noReferrer");
    }
  };
  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setGeminiResponse([]);
    const url = formData?.endpoint;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `
This is the prompt: ${searchQuery}
This is the dataset of posts in js array: '${JSON.stringify(posts)}'

Now based on this post dataset and the prompt,
give me all the related posts matched with what prompt.
Use description, title, tag, score, comments, for matching.
Give me the list of posts with the same format as I have given.
Don’t give me any extra text even if you failed to find any.
Just give me empty array if not match found. And if found, return only the matching posts.
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
      const extractData = extractJsonListFromMarkdown(
        data as string
      ) as IPost[];
      console.info(extractData);
      setGeminiResponse(extractData);
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
        <Header title="Posts" count={posts?.length || geminiResponse?.length} onRemove={onRemove} />
        <Search handleSearch={handleSearch} />
        {loading && <p className="text-center text-white text-2xl">Loading...</p>}
        <div className="px-2 flex-1 overflow-y-auto">
          {(geminiResponse?.length ? geminiResponse : posts)?.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="m-3 p-4 border border-gray-500  hover:border-gray-200 transition rounded-xl "
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
                <div className="mt-1 flex items-center gap-2 text-gray-300">
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
