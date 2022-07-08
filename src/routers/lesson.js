// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddLesson from "../containers/managePrograms/program/lesson/addLesson";
const LessonRoutes = [
  {
    path: "/add-lesson",
    exact: true,
    layout: DefaultLayout,
    component: AddLesson
  },
  {
    path: "/edit-lesson",
    exact: true,
    layout: DefaultLayout,
    component: AddLesson
  },
  {
    path: "/view-lesson",
    exact: true,
    layout: DefaultLayout,
    component: AddLesson
  },
];
export default LessonRoutes;
