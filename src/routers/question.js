// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import QuestionList from "../containers/questionnaire/question/questionList";
import AddQuestion from "../containers/questionnaire/question/addQuestion";

const QuestionRoutes = [
  {
    path: "/add-question",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestion
  },
  {
    path: "/edit-question",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestion
  },
  {
    path: "/view-question",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestion
  },
  {
    path: "/question-list",
    exact: true,
    layout: DefaultLayout,
    component: QuestionList
  }
];
export default QuestionRoutes;
