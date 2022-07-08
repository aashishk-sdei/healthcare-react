// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddIntervention from "../containers/manageIntervention/intervention/add";
import InterventionList from "../containers/manageIntervention/intervention/list";
const InterventionRoutes = [
  {
    path: "/add-intervention",
    exact: true,
    layout: DefaultLayout,
    component: AddIntervention
  },
  {
    path: "/edit-intervention",
    exact: true,
    layout: DefaultLayout,
    component: AddIntervention
  },
  {
    path: "/view-intervention",
    exact: true,
    layout: DefaultLayout,
    component: AddIntervention
  },
  {
    path: "/intervention-list",
    exact: true,
    layout: DefaultLayout,
    component: InterventionList
  }
];
export default InterventionRoutes;
