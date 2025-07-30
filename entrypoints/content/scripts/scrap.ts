import { comment } from "postcss";

export interface IPost {
  title: string;
  link: string;
  tag: string | null;
  comments: string | null;
  description: string | null;
  score: string | null;
  id: number;
}

export interface IComment {
  author: string;
  comment: string;
  permalink: string;
  id: string;
  score: string;
}

export function extractPosts() {
  const postElements = document.querySelectorAll("shreddit-post");
  const postData: IPost[] = [];

  postElements.forEach((postElement, key) => {
    const title = postElement.getAttribute("post-title")?.trim();
    const permalink = postElement.getAttribute("permalink");
    const fullLink = permalink ? `https://www.reddit.com${permalink}` : null;
    const commentCount = postElement.getAttribute("comment-count");

    const tagElement = postElement.querySelector(
      "shreddit-post-flair .flair-content"
    );
    const tag = tagElement?.textContent?.trim() || null;

    const descriptionElement = postElement.querySelector(
      'div[data-post-click-location="text-body"] > div'
    );
    const description = descriptionElement?.textContent?.trim() || null;

    const scoreElement = postElement.getAttribute("score");
    const score = scoreElement ? scoreElement : null;

    if (title && fullLink) {
      postData.push({
        id: key,
        title,
        link: fullLink,
        tag,
        comments: commentCount,
        description,
        score,
      });
    }
  });

  return postData;
}

export function extractComments() {
  const comments = document.querySelectorAll("shreddit-comment");
  const postComments: IComment[] = [];
  comments.forEach((comment, key) => {
    const author = comment.getAttribute("author") || "";

    const score = comment.getAttribute("score") || "";
    const permalink = comment.getAttribute("permalink") || "";
    const thingId = comment.getAttribute("thingid") || "";
    const commentDiv = document.getElementById(
      `${thingId}-post-rtjson-content`
    );
    const commentText = commentDiv ? commentDiv.innerText : "";

    if (commentText) {
      postComments.push({
        author,
        score,
        permalink,
        id: key.toString() || thingId,
        comment: commentText,
      });
    } else {
      console.warn(`comment content not found for thingId: ${thingId}`);
    }
  });

  return postComments;
}
