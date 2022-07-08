import { general } from '../reducers/general';
import { user } from '../reducers/user';
import { userType } from '../reducers/userType';
import { groupType } from '../reducers/groupType';
import { group } from '../reducers/group';
import { modules } from '../reducers/module';
import { client } from '../reducers/client';
import { staff } from '../reducers/staff';
import { assignViews } from '../reducers/assignViews';
import { permission } from '../reducers/permissions';
import { icd } from '../reducers/icd';
import { icdCategory } from '../reducers/icdCategory';
import { view } from '../reducers/view';
import { questionnaire } from '../reducers/questionnaire';
import { survey } from '../reducers/survey.js';
import { disease } from '../reducers/manageDisease';
import { program } from '../reducers/program';
import { emails } from '../reducers/email';
import { knowledge } from '../reducers/knowledge';
import { diagnosis } from '../reducers/diagnosis';
import { carepath } from '../reducers/carePath';
import { language } from '../reducers/language';
import { label } from '../reducers/label';
import { problem } from '../reducers/problem';
import { goal } from '../reducers/goal';
import { auditLog } from '../reducers/auditLog';
import { census } from '../reducers/census';


export const initialState = {
  general,
  user,
  userType,
  groupType,
  group,
  assignViews,
  permission,
  modules,
  client,
  staff,
  icd,
  icdCategory,
  view,
  questionnaire,
  survey,
  disease,
  program,
  emails,
  knowledge,
  diagnosis,
  carepath,
  language,
  label,
  problem,
  goal,
  auditLog,
  census
};