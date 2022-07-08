// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AuditLogList from "../containers/manageLogs/auditLogList.js";

const AuditLogRoutes = [
  {
    path: "/audit-logs",
    exact: true,
    layout: DefaultLayout,
    component: AuditLogList
  }
];

export default AuditLogRoutes;
