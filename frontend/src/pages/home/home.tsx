import { Helmet } from "../../components/ui";
import { Home } from "../../features/home";

export const HomePage = () => {
  return (
    <Helmet title="Home">
      <Home />
    </Helmet>
  );
};
