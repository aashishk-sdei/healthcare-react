import AuthRoutes from './auth';
import CommonRoutes from './common';
import GroupRoutes from './group';
import GroupTypeRoutes from './groupType';
import UserRoutes from './user';
import LocationRoutes from './location';
import ClientsRoutes from './client';
import ICDRoutes from './icd';
import StaffRoutes from './staff';
import MasterModuleRoutes from './masterModule';
import ManageViewRoutes from './manageView';
import ICDCategoriesRoutes from './icdCategories';
import ManageDiseasesRoutes from './manageDiseases';
import ManageSurveyRoutes from './manageSurvey';
import QuestionRoutes from './question';
import QuestionCategoriesRoutes from './questionCategories';
import QuestionnaireRoutes from './questionnaire';
import ProgramTypeRoutes from './programType';
import ProgramRoutes from './program';
import LessonRoutes from './lesson';
import KnowledgeCategoryRoutes from './knowledgeCategory';
import KnowledgeRoutes from './knowledge';
import EmailRoutes from './emails';
import DiagnosisRoutes from './diagnosis';
import ProblemRoutes from './problem';
import CarePathRoutes from './carePathway';
import LanguageRoutes from './language';
import LabelRoutes from './label';
import GoalRoutes from './goal';
import InterventionRoutes from './intervention';
import ContentPage from './contentPage';
import AuditLogRoutes from './auditlogs';
import CensusRoutes from './census';

const Routes = [...AuthRoutes, ...ClientsRoutes, ...CommonRoutes, ...LabelRoutes, ...GroupRoutes, ...GroupTypeRoutes, ...UserRoutes, ...LanguageRoutes, ...LocationRoutes, ...ICDRoutes, ...MasterModuleRoutes, ...ManageViewRoutes, ...ICDCategoriesRoutes, ...ProblemRoutes, ...CarePathRoutes,
...QuestionCategoriesRoutes, ...ManageDiseasesRoutes, ...ManageSurveyRoutes, ...QuestionRoutes, ...QuestionnaireRoutes, ...StaffRoutes, ...ProgramTypeRoutes, ...ProgramRoutes, ...LessonRoutes, ...KnowledgeCategoryRoutes, ...KnowledgeRoutes, ...EmailRoutes, ...DiagnosisRoutes, ...GoalRoutes, 
...InterventionRoutes, ...ContentPage, ...AuditLogRoutes, ...CensusRoutes];

export default Routes;