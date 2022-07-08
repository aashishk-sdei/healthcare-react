/*********** Reduceres defined here *********/

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
// import { connectRouter } from 'connected-react-router';
// import history from './../../history';
import encryptor from './encryptor';

import { general } from './general';
import { user } from './user';
import { group } from './group';
import { groupType } from './groupType';
import { userType } from './userType';
import { client } from './client';
import { modules } from './module';
import { staff } from './staff';
import { assignViews } from './assignViews';
import { permission } from './permissions';
import { icd } from './icd';
import { icdCategory } from './icdCategory';
import { view } from './view';
import { questionnaire } from './questionnaire';
import { survey } from './survey';
import { disease } from './manageDisease';
import { program } from './program';
import { emails } from './email';
import { tag } from './tag';
import { knowledge } from './knowledge';
import { diagnosis } from './diagnosis';
import { carepath } from './carePath';
import { language } from './language';
import { label } from './label';
import { problem } from './problem';
import { goal } from './goal';
import { intervention } from './intervention';
import { auditLog } from './auditLog';
import { contentPage } from './contentPage';
import { census } from './census';


const userPersistConfig = {
  key: 'admin-app',
  storage: storage,
  transforms: [encryptor],
  blacklist: ['router', 'loader']
};

export default persistCombineReducers(userPersistConfig, {
  general,
  user,
  group,
  groupType,
  userType,
  modules,
  permission,
  assignViews,
  client,
  staff,
  icd,
  disease,
  icdCategory,
  view,
  questionnaire,
  survey,
  program,
  emails,
  tag,
  knowledge,
  diagnosis,
  carepath,
  language,
  label,
  problem,
  goal,
  intervention,
  auditLog,
  contentPage,
  census,
  // router: connectRouter(history)
});


