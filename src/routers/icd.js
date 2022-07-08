// Layout Types
import { DefaultLayout, PrivateLayout } from "../layouts";

// Route Views
import ICDList from "../containers/icd/ICDList";
import AddICD from "../containers/icd/addICD";


const ICDRoutes = [
  {
    path: "/add-icd",
    exact: true,
    layout: DefaultLayout,
    component: AddICD
  },
  {
    path: "/manage-icd",
    exact: true,
    layout: DefaultLayout,
    component: AddICD
  },
  {
    path: "/view-icd",
    exact: true,
    layout: DefaultLayout,
    component: AddICD
  },
  {
    path: "/icd",
    exact: true,
    layout: DefaultLayout,
    component: ICDList
  }
];
export default ICDRoutes;
