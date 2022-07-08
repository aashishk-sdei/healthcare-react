// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddGoal from "../containers/manageGoal/goal/add";
import GoalList from "../containers/manageGoal/goal/list";
const GoalRoutes = [
  {
    path: "/add-goal",
    exact: true,
    layout: DefaultLayout,
    component: AddGoal
  },
  {
    path: "/edit-goal",
    exact: true,
    layout: DefaultLayout,
    component: AddGoal
  },
  {
    path: "/view-goal",
    exact: true,
    layout: DefaultLayout,
    component: AddGoal
  },
  {
    path: "/goal-list",
    exact: true,
    layout: DefaultLayout,
    component: GoalList
  }
];
export default GoalRoutes;
