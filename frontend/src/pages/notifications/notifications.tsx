import { Helmet } from "../../components/common";
import { Notifications } from "../../features/notifications";

export const NotificationsPage = () => {
  return (
    <Helmet title="Notifications">
      <Notifications />
    </Helmet>
  );
};
