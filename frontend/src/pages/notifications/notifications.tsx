import { Helmet } from "../../components/ui";
import { Notifications } from "../../features/notifications";

export const NotificationsPage = () => {
  return (
    <Helmet title="Notifications">
      <Notifications />
    </Helmet>
  );
};
