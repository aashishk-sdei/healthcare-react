// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import ICDCategoriesList from "../containers/icd/icdCategories/ICDCategoriesList";
import AddICDCategories from "../containers/icd/icdCategories/addICDCategories";


const ICDCategoriesRoutes = [
  {
    path: "/add-icd-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddICDCategories
  },
  {
    path: "/edit-icd-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddICDCategories
  },
  {
    path: "/view-icd-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddICDCategories
  },
  {
    path: "/icd-categories",
    exact: true,
    layout: DefaultLayout,
    component: ICDCategoriesList
  }
];
export default ICDCategoriesRoutes;
