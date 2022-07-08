// Layout Types
import { DefaultLayout } from "../layouts";
// Route Views
import AddCensusFrom from "../containers/manageCensus/census/add";
import EditCensus from "../containers/manageCensus/census/edit";
import ManageCensusList from "../containers/manageCensus/census/list";
const CensusRoutes = [
  {
    path: "/add-census",
    exact: true,
    layout: DefaultLayout,
    component: AddCensusFrom
  },
  {
    path: "/census-list",
    exact: true,
    layout: DefaultLayout,
    component: ManageCensusList
  }, {
    path: "/edit-sensus",
    exact: true,
    layout: DefaultLayout,
    component: EditCensus
  },
  {
    path: "/view-census",
    exact: true,
    layout: DefaultLayout,
    component: EditCensus
  }
];
export default CensusRoutes;
