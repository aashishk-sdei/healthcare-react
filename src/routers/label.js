// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddLabel from "../containers/manageLabel/add";
import LabelList from "../containers/manageLabel/list";
const LabelRoutes = [
  {
    path: "/add-label",
    exact: true,
    layout: DefaultLayout,
    component: AddLabel
  },
  {
    path: "/edit-label",
    exact: true,
    layout: DefaultLayout,
    component: AddLabel
  },
  {
    path: "/view-label",
    exact: true,
    layout: DefaultLayout,
    component: AddLabel
  },
  {
    path: "/label-list",
    exact: true,
    layout: DefaultLayout,
    component: LabelList
  }
];
export default LabelRoutes;
