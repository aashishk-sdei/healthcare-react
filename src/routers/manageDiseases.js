// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import ManageDiseasesList from "../containers/manageDiseases/manageDiseases/manageDiseasesList";
import AddManageDiseases from "../containers/manageDiseases/manageDiseases/addManageDiseases";

const ManageDiseasesRoutes = [
  {
    path: "/add-manage-diseases",
    exact: true,
    layout: DefaultLayout,
    component: AddManageDiseases
  },
  {
    path: "/edit-manage-diseases",
    exact: true,
    layout: DefaultLayout,
    component: AddManageDiseases
  },
  {
    path: "/view-manage-diseases",
    exact: true,
    layout: DefaultLayout,
    component: AddManageDiseases
  },
  {
    path: "/manage-diseases-list",
    exact: true,
    layout: DefaultLayout,
    component: ManageDiseasesList
  }
];
export default ManageDiseasesRoutes;
