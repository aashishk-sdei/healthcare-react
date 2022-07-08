// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import KnowledgeCategoryList from "../containers/knowledge/manageknowledgecategory/list";
import AddKnowledgeCategory from "../containers/knowledge/manageknowledgecategory/add";
const KnowledgeCategoryRoutes = [
  {
    path: "/add-knowledge-category",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledgeCategory
  },
  {
    path: "/edit-knowledge-category",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledgeCategory
  },
  {
    path: "/view-knowledge-category",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledgeCategory
  },
  {
    path: "/knowledge-category",
    exact: true,
    layout: DefaultLayout,
    component: KnowledgeCategoryList
  }
];
export default KnowledgeCategoryRoutes;
