// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddProblem from "../containers/manageProblem/problem/add";
import ProblemList from "../containers/manageProblem/problem/list";
const ProblemRoutes = [
  {
    path: "/add-problem",
    exact: true,
    layout: DefaultLayout,
    component: AddProblem
  },
  {
    path: "/edit-problem",
    exact: true,
    layout: DefaultLayout,
    component: AddProblem
  },
  {
    path: "/view-problem",
    exact: true,
    layout: DefaultLayout,
    component: AddProblem
  },
  {
    path: "/problem-list",
    exact: true,
    layout: DefaultLayout,
    component: ProblemList
  }
];
export default ProblemRoutes;
