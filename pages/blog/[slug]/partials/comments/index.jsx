import styles from "./comments.module.css";
import Comment from "../comment";
import { getComments, commentsCacheKey } from "@/api-routes/comments";
import useSWR from "swr";

export default function Comments({ id, slug }) {
  /* 
  Here is a good place to fetch the comments from the database that has a 
  foreign key relation to the post.
  */

  const { data : { data = [] } = {}, error } = useSWR(id ? commentsCacheKey : null, () => 
  getComments(id)
);

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}