// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import QuestionCategoriesList from "../containers/questionnaire/questionCategories/questionCategoriesList";
import AddQuestionCategories from "../containers/questionnaire/questionCategories/addQuestionCategories";


const QuestionCategoriesRoutes = [
  {
    path: "/add-question-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionCategories
  },
  {
    path: "/edit-question-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionCategories
  },
  {
    path: "/view-question-categories",
    exact: true,
    layout: DefaultLayout,
    component: AddQuestionCategories
  },
  {
    path: "/question-categories",
    exact: true,
    layout: DefaultLayout,
    component: QuestionCategoriesList
  }
];
export default QuestionCategoriesRoutes;
