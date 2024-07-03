import { Helmet } from "../../components/common";
import { Home } from "../../features/home";

export const HomePage = () => {
  return (
    <Helmet title="Home">
      <Home />;
    </Helmet>
  );
};
