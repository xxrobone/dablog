import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";

export default function CreatePost() {
  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    console.log({ editorContent, titleInput, image, slug });
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
