// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import ProgramList from "../containers/managePrograms/program/programList";
import AddProgram from "../containers/managePrograms/program/addProgram";
const ProgramRoutes = [
  {
    path: "/add-program",
    exact: true,
    layout: DefaultLayout,
    component: AddProgram
  },
  {
    path: "/edit-program",
    exact: true,
    layout: DefaultLayout,
    component: AddProgram
  },
  {
    path: "/view-program",
    exact: true,
    layout: DefaultLayout,
    component: AddProgram
  },
  {
    path: "/program-list",
    exact: true,
    layout: DefaultLayout,
    component: ProgramList
  }
];
export default ProgramRoutes;
