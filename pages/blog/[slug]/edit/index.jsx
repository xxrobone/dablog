import { useRouter } from "next/router";
import BlogEditor from "../../../../components/blog-editor";

const mockData = {
  title: "Community-Messaging Fit",
  body: "<p>This is a good community fit!</p>",
  image:
    "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg",
};
export default function EditBlogPost() {
  const router = useRouter();
  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  const handleOnSubmit = ({ editorContent, titleInput, image }) => {
    console.log({ editorContent, titleInput, image, slug });
  };

  return (
    <BlogEditor
      heading="Edit blog post"
      title={mockData.title}
      src={mockData.image}
      alt={mockData.title}
      content={mockData.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}
