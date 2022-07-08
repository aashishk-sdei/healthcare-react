// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddManageView from "../containers/manageContentPages/contentPages/addContentPage";
import ContentPageList from "../containers/manageContentPages/contentPages/contentPagesList";
const ContentPageRoutes = [
  {
    path: "/add-content-page",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/edit-content-page",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/view-content-page",
    exact: true,
    layout: DefaultLayout,
    component: AddManageView
  },
  {
    path: "/content-page-list",
    exact: true,
    layout: DefaultLayout,
    component: ContentPageList
  }
];
export default ContentPageRoutes;
