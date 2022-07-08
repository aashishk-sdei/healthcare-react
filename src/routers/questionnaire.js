// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import QuestionnaireList from "../containers/questionnaire/questionnaire/questionnaireList";
import AddQuestionnaire from "../containers/questionnaire/questionnaire/addqQuestionnaire";
import AssignedQuestionnaireList from "../containers/managePrograms/program/lesson/assignedQuestionnaire/assignedQuestionnaireList";

const QuestionnaireRoutes = [
  {
    path: "/add-questionnaire",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionnaire
  },
  {
    path: "/edit-questionnaire",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionnaire
  },
  {
    path: "/view-questionnaire",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionnaire
  },
  {
    path: "/questionnaire-list",
    exact: true,
    layout: DefaultLayout,
    component: QuestionnaireList
  },
  {
    path: "/assigned-questionnaire",
    exact: true,
    layout: DefaultLayout,
    component: AssignedQuestionnaireList
  }
];
export default QuestionnaireRoutes;
