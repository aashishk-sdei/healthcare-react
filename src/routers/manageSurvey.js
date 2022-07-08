// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views

import manageSurveyList from "../containers/manageSurvey/manageSurvey/manageSurveyList";
import AddManageSurvey from "../containers/manageSurvey/manageSurvey/addManageSurvey";

const ManageSurveyRoutes = [
  {
    path: "/add-survey-category",
    exact: true,
    layout: DefaultLayout,
    component: AddManageSurvey
  },
  {
    path: "/edit-survey-category",
    exact: true,
    layout: DefaultLayout,
    component: AddManageSurvey
  },
  {
    path: "/view-survey-category",
    exact: true,
    layout: DefaultLayout,
    component: AddManageSurvey
  },
  {
    path: "/survey-category-list",
    exact: true,
    layout: DefaultLayout,
    component: manageSurveyList
  }
];
export default ManageSurveyRoutes;