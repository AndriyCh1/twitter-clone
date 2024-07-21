import { Helmet } from "../../components/ui";
import { SavedPosts } from "../../features/posts";

export const SavedPostsPage = () => {
  return (
    <Helmet title="Saved">
      <SavedPosts />
    </Helmet>
  );
};
