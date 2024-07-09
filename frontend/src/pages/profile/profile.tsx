import { useParams } from "react-router-dom";
import { Helmet } from "../../components/ui";
import { Profile } from "../../features/profile";

export const ProfilePage = () => {
  const { username } = useParams();

  return (
    <Helmet title={`@${username} - Profile`}>
      <Profile />
    </Helmet>
  );
};
