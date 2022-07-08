// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import KnowledgeList from "../containers/knowledge/manageknowledge/knowledgeList";
import AddKnowledge from "../containers/knowledge/manageknowledge/addKnowledge";
const KnowledgeRoutes = [
  {
    path: "/add-knowledge",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledge
  },
  {
    path: "/edit-knowledge",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledge
  },
  {
    path: "/view-knowledge",
    exact: true,
    layout: DefaultLayout,
    component: AddKnowledge
  },
  {
    path: "/knowledge",
    exact: true,
    layout: DefaultLayout,
    component: KnowledgeList
  }
];
export default KnowledgeRoutes;
