// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import ManageViewList from "../containers/manageView/manageViewList";
import AddManageView from "../containers/manageView/addManageView";


const ManageViewRoutes = [
  {
    path: "/add-view",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/manage-view",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/views",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/view",
    exact: true,
    layout: DefaultLayout,
    component: ManageViewList
  },

];
export default ManageViewRoutes;
