// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import ProgramTypeList from "../containers/managePrograms/programType/programTypeList";
import AddProgramType from "../containers/managePrograms/programType/addProgramType";

const ProgramTypeRoutes = [
  {
    path: "/add-program-type",
    exact: true,
    layout: DefaultLayout,
    component: AddProgramType
  },
  {
    path: "/edit-program-type",
    exact: true,
    layout: DefaultLayout,
    component: AddProgramType
  },
  {
    path: "/view-program-type",
    exact: true,
    layout: DefaultLayout,
    component: AddProgramType
  },
  {
    path: "/program-type-list",
    exact: true,
    layout: DefaultLayout,
    component: ProgramTypeList
  }
];
export default ProgramTypeRoutes;
