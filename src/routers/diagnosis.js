// Layout Types
import { DefaultLayout } from "../layouts";

// Route Views
import AddDiagnosis from "../containers/manageDiagnosis/diagnosis/add";
import DiagnosisList from "../containers/manageDiagnosis/diagnosis/list";
import ViewDiagnosis from "../containers/manageDiagnosis/diagnosis/view";
import DetailDiagnosis from "../containers/manageDiagnosis/diagnosis/detail";
const DiagnosisRoutes = [
  {
    path: "/add-diagnosis",
    exact: true,
    layout: DefaultLayout,
    component: AddDiagnosis
  },
  {
    path: "/edit-diagnosis",
    exact: true,
    layout: DefaultLayout,
    component: AddDiagnosis
  },
  {
    path: "/view-diagnosis",
    exact: true,
    layout: DefaultLayout,
    component: AddDiagnosis
  },
  {
    path: "/view-diagnosis-detail",
    exact: true,
    layout: DefaultLayout,
    component: ViewDiagnosis
  },
  {
    path: "/view-detail-diagnosis",
    exact: true,
    layout: DefaultLayout,
    component: DetailDiagnosis
  },
  {
    path: "/diagnosis-list",
    exact: true,
    layout: DefaultLayout,
    component: DiagnosisList
  }
];
export default DiagnosisRoutes;
