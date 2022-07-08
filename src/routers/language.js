// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddLanguage from "../containers/language/add";
import LanguageList from "../containers/language/list";
const LanguageRoutes = [
  {
    path: "/add-language",
    exact: true,
    layout: DefaultLayout,
    component: AddLanguage
  },
  {
    path: "/edit-language",
    exact: true,
    layout: DefaultLayout,
    component: AddLanguage
  },
  {
    path: "/view-language",
    exact: true,
    layout: DefaultLayout,
    component: AddLanguage
  },
  {
    path: "/language-list",
    exact: true,
    layout: DefaultLayout,
    component: LanguageList
  }
];
export default LanguageRoutes;
