// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddEmailType from "../containers/emails/emailType/add";
import EmailTypeList from "../containers/emails/emailType/list";
import AddEmailTemplate from "../containers/emails/emailTemplate/add";
import EmailTemplateList from "../containers/emails/emailTemplate/list";
const EmailRoutes = [
  {
    path: "/add-email-type",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailType
  },
  {
    path: "/edit-email-type",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailType
  },
  {
    path: "/view-email-type",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailType
  },
  {
    path: "/email-type-list",
    exact: true,
    layout: DefaultLayout,
    component: EmailTypeList
  },
  {
    path: "/add-email-template",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailTemplate
  },
  {
    path: "/edit-email-template",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailTemplate
  },
  {
    path: "/view-email-template",
    exact: true,
    layout: DefaultLayout,
    component: AddEmailTemplate
  },
  {
    path: "/email-template-list",
    exact: true,
    layout: DefaultLayout,
    component: EmailTemplateList
  }
];
export default EmailRoutes;
