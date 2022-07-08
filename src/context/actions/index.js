import { general } from './general';
import { user } from './user';
import { group } from './group';
import { userType } from './userType';
import { groupType } from './groupType';
import { modules } from './modules';
import { assignViews } from './assignViews';
import { managePermission } from './managePermission';
import { icd } from './icd';
import { view } from './view';
import { questionnaire } from './questionnaire';
import { survey } from './survey';
import { disease } from './manageDisease';
import { program } from './program';
import { condition } from './condition';
import { knowledge } from './knowledge';
import { diagnosis } from './diagnosis';
import { carePathway } from './carePathway';
import { language } from './language';
import { label } from './label';
import { problem } from './problem';
import { goal } from './goal';
import { intervention } from './intervention';
import { auditLog } from './auditLog';
import { contentPage } from './contentPage';


export const useActions = (state, dispatch) => {
  return {
    general: general({ state, dispatch }),
    user: user({ state, dispatch }),
    group: group({ state, dispatch }),
    userType: userType({ state, dispatch }),
    groupType: groupType({ state, dispatch }),
    modules: modules({ state, dispatch }),
    icd: icd({ state, dispatch }),
    assignViews: assignViews({ state, dispatch }),
    managePermission: managePermission({ state, dispatch }),
    view: view({ state, dispatch }),
    questionnaire: questionnaire({ state, dispatch }),
    disease: disease({ state, dispatch }),
    survey: survey({ state, dispatch }),
    program: program({ state, dispatch }),
    condition: condition({ state, dispatch }),
    knowledge: knowledge({ state, dispatch }),
    diagnosis: diagnosis({ state, dispatch }),
    carePathway: carePathway({ state, dispatch }),
    language: language({ state, dispatch }),
    label: label({ state, dispatch }),
    problem: problem({ state, dispatch }),
    goal: goal({ state, dispatch }),
    intervention: intervention({ state, dispatch }),
    auditLog: auditLog({ state, dispatch }),
    contentPage: contentPage({ state, dispatch }),
  }
};
