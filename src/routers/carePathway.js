// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddCarePathway from "../containers/manageCarePathways/carePathways/add";
import CarePathwayList from "../containers/manageCarePathways/carePathways/list";
const CarePathRoutes = [
  {
    path: "/add-care-path",
    exact: true,
    layout: DefaultLayout,
    component: AddCarePathway
  },
  {
    path: "/edit-care-path",
    exact: true,
    layout: DefaultLayout,
    component: AddCarePathway
  },
  {
    path: "/view-care-path",
    exact: true,
    layout: DefaultLayout,
    component: AddCarePathway
  },
  {
    path: "/care-path-list",
    exact: true,
    layout: DefaultLayout,
    component: CarePathwayList
  }
];
export default CarePathRoutes;
