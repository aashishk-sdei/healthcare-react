/*
 * @file: constants.js
 * @description: It Contain action types Related Action.
 * @author: Dixit
 */

/************ User *************/
export const public_type = "public";
export const private_type = "private";
export const pagination = {
  page: 1,
  limit: 10,
  maxlimit: 10000
};

export const sorting = {
  sortkey: 'createdAt',
  sortby: -1
};

export const DummyUserImage = require("../images/avatars/0.jpg");

export const modules = [
  {
    title: "Dashboard",
    to: "/dashboard"
  },
  {
    title: "Manage Groups",
    to: "/group-list"
  },
  {
    title: "Manage Client",
    to: "/client-list",
  },
  {
    title: "Manage Group Types",
    to: "/group-type-list"
  },
  {
    title: "Manage User Type",
    to: "/user-type-list"
  },
  {
    title: "ICD Management",
    to: "/icd"
  },
  {
    title: "CMS",
    to: "/email-type-list"
  },
  {
    title: "Questionnaire Creater",
    to: "/coming-soon2"
  },
  {
    title: "Algorithm Creater",
    to: "/coming-soon3"
  },
  {
    title: "Event Engine",
    to: "/coming-soon4"
  },
  {
    title: "Engagement Tools",
    to: "/coming-soon5"
  },
  {
    title: "Locations",
    to: "/coming-soon6"
  },
  {
    title: "Education Program",
    to: "/coming-soon7"
  },
  {
    title: "Communication",
    to: "/communication"
  },
  {
    title: "TableComponent",
    to: "/TableComponent"
  }


]

//@rid = module reference id in admin table and name is as same as in the master module tabls
// export const GroupAdminRoutes = {
//   '#50:4': 'Manage Master Module',
//   '#53:18': 'Manage Client',
//   '#51:4': 'Manage Groups',
//   '#50:20': 'Manage User Type',
//   '#52:4': 'Manage Group Types',
//   '#51:20': 'Knowledge Bank',
//   '#52:20': 'ICD',
//   '#53:4': 'Manage View',
//   '#50:19': 'Survey Category',
//   '#51:19': 'Questionnaire',
//   '#53:14': 'Education Program',
//   '#52:19': 'Manage Diseases',
//   '#53:15': 'Manage Staff',
//   '#53:17': 'Manage Language',
//   '#50:18': 'Manage Label',
//   '#51:18': 'Diagnosis',
//   '#52:18': 'Care Pathway',
//   '#51:16': 'CMS'
// }

// GENDER LISTS
export const QuestionsFor = [
  { name: 'Male', '@rid': '1' },
  { name: 'Female', '@rid': '2' },
  { name: 'Both', '@rid': '3' },
]

// answer Type LISTS
export const AnswerTypes = [
  { name: 'Textbox', '@rid': '1' },
  { name: 'Checkbox', '@rid': '2' },
  { name: 'Radio', '@rid': '3' },
  { name: 'Dropdown', '@rid': '4' },
  { name: 'Date', '@rid': '5' },
  { name: 'Number', '@rid': '6' },
  { name: 'Time', '@rid': '7' },
  { name: 'Cholestrol', '@rid': '8' },
  { name: 'Water', '@rid': '9' },
  { name: 'Wake Time', '@rid': '10' },
  { name: 'Bedtime', '@rid': '11' },
  { name: 'Breakfast', '@rid': '12' },
  { name: 'Lunch', '@rid': '13' },
  { name: 'Dinner', '@rid': '14' },
  { name: 'Password', '@rid': '15' },
  { name: 'Confirm Password', '@rid': '16' },
  { name: 'Pressure', '@rid': '17' },
  { name: 'Glucose', '@rid': '18' },
  { name: 'Blood Pressure', '@rid': '19' },
  { name: 'Blood Glucose', '@rid': '20' },
  { name: 'Birthday', '@rid': '21' },
  { name: 'Zip Code', '@rid': '22' },
  { name: 'SSN', '@rid': '23' },
  { name: 'Access Code', '@rid': '24' },
  { name: 'Weight', '@rid': '25' },
  { name: 'Height', '@rid': '26' },
  { name: 'Distance', '@rid': '27' }
]

// Points
export const Points = [
  { name: '0', '@rid': '0' },
  { name: '1', '@rid': '1' },
  { name: '2', '@rid': '2' },
  { name: '3', '@rid': '3' },
  { name: '4', '@rid': '4' },
  { name: '5', '@rid': '5' },
  { name: '6', '@rid': '6' },
  { name: '7', '@rid': '7' },
  { name: '8', '@rid': '8' },
  { name: '9', '@rid': '9' },
  { name: '10', '@rid': '10' }
]


// Completion Flags
export const CompletionFlags = [
  { name: 'Daily', '@rid': '0' },
  { name: 'Weekly', '@rid': '1' },
  { name: 'Monthly', '@rid': '2' },
  { name: 'Quarterly', '@rid': '3' },
  { name: '6 Monthly', '@rid': '4' },
  { name: 'Annually', '@rid': '5' },
  { name: 'Open', '@rid': '6' }
]

// Icon Type
export const IconType = {
  'video': 'play_circle_filled',
  'contentPage': 'description',
  'reward': 'emoji_events',
  'questionnaire': 'help',
  'pdf': 'picture_as_pdf'
}

// Assets Icon Type
export const AssetsIconType = {
  '0': 'play_circle_filled',
  '1': 'picture_as_pdf',
  '2': 'description',
}

export const Assets = [
  { name: 'Video', '@rid': '0' },
  { name: 'PDF', '@rid': '1' },
  { name: 'Content Page', '@rid': '2' }
]

export const GROUP_TYPE_FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
];
export const USER_TYPE_FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
];
export const GROUP_FIELDS = [
  { key: 'groupName', label: 'Name' },
  { key: 'groupContactName', label: 'Contact Name' },
  { key: 'groupContactPhone', label: 'Contact Phone' },
  { key: 'groupContactEmail', label: 'Contact Email Address' },
  { key: 'createdAt', label: 'Created On' }
];
export const CENSUS_LIST_FIELD = [


  { key: 'firstname', label: 'First Name' },
  { key: 'lastname', label: 'Last Name' },
  { key: 'mobile', label: 'Phone' },
  { key: 'emailaddress', label: 'Email' },
  { key: 'brand_identifier', label: 'Brand Identifier' },
  { key: 'census_status', label: 'Census status' },
  // { key: 'createdOn', label: 'Created On' }
];

export const ICD_FIELDS = [
  { key: 'icd_category', child: 'name', label: 'Name' },
  { key: 'icd9_code', label: 'ICD9' },
  { key: 'icd10_code', label: 'ICD10' },
  // { key: 'description', label: 'Description' },
  { key: 'createdAt', label: 'Created On' }
];

export const SEARCH_ICD_FIELDS = [
  { key: 'icd9_code', label: 'ICD9' },
  { key: 'icd10_code', label: 'ICD10' },
  { key: 'description', label: 'Description' }
];
export const GROUP_SAC_FIELDS = {
  "eL3LYNzKeLqc3qD83": "Clinician",
  "JXXjWmyE7RqXt9EqC": "Front Desk",
  "5D7zHkvy9wiNX6w2B": "Group Admin",
  "mSz44BAjbDuRBJGCk": "Patient"
};
export const CLIENT_FIELDS = [
  // Primary Contact:
  { key: 'contactName', label: 'Name' },
  { key: 'contactEmail', label: 'Email' },
  { key: 'contactPhone', label: ' Phone' },
  { key: 'fullname', label: 'Contact Person Name  ' },
  { key: 'position', label: 'Position' },
  { key: 'createdOn', label: 'Created On' }
]
export const STAFF_FIELDS = [
  // Primary Contact:
  { key: 'firstname', label: 'Name' },
  { key: 'email', label: ' Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'usertype', label: 'User Type', isSort: true },
  { key: 'createdOn', label: 'Created On  ' },
  // { key: 'phone', label: ' Phone' },
  // { key: 'email', label: ' Email' },
  // { key: 'address', label: 'Addresss Line 1' },
  // { key: 'addressLine2', label: 'Addresss Line 2' },
  // { key: 'addressLine2', label: 'Address Line 3' },
  // { key: 'city', label: 'City' },
  // { key: 'state', label: 'State' },
  // { key: 'zipcode', label: 'Zip Code' },
]
export const MasterModule_FIELDS = [
  { key: 'moduleName', label: 'Name' },
  // { key: 'description', label: 'Description' },
  { key: 'createdAt', label: 'Created On' }
]
export const MANAGE_VIEW_FIELDS = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
]
export const ICD_CATEGORIESS_FIELDS = [
  { key: 'name', label: 'Name' },
  // { key: 'parentCategory', label: 'Parent Category' },
  { key: 'createdAt', label: 'Created On' }
]
export const QUESTION_CATEGORIESS_LIST_FIELDS = [
  { key: 'categoryName', label: 'Name' },
  { key: 'parentCategoryName', label: 'Parent Category', isSort: true },
  { key: 'colour', label: 'Colour', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const MANAGE_DISEASES_LIST_FIELDS = [
  { key: 'name', label: 'Disease' },
  { key: 'parent', label: 'Parent', isSort: true },
  { key: 'color_hex', label: 'Colour', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const MANAGE_SURVEY_LIST_FIELD = [
  { key: 'categoryName', label: 'Name' },
  { key: 'parentCategoryName', label: 'Parent Category', isSort: true },
  { key: 'colour', label: 'Colour', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const QUESTION_LIST_FIELD = [
  { key: 'question', label: 'Question' },
  { key: 'categoryName', label: 'Category', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const QUESTIONNAIRE_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
]
export const PROGRAM_TYPE_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
]
export const KNOWLEDGE_CATEGORY_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'parent', label: 'Parent Category', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const KNOWLEDGE_LIST_FIELD = [
  { key: 'name', label: 'Title' },
  { key: 'categories', label: 'Category', isSort: true },
  { key: 'assets', label: 'Asset', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const PROGRAM_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created On' }
]
export const DIAGNOSIS_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  // { key: 'problem', label: 'Problem', isSort: true },
  // { key: 'goals', label: 'Goals', isSort: true },
  // { key: 'interventions', label: 'Interventions', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]

export const CARE_PATH_DIAGNOSIS_LIST_FIELD = [
  { key: 'name', label: 'Name', isSort: true },
  { key: 'description', label: 'Description', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]

export const CARE_PATH_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'gender', label: 'Gender', isSort: true },
  { key: 'age', label: 'Age', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const LANGUAGE_LIST_FIELD = [
  { key: 'name', label: 'Name' },
  { key: 'shortCode', label: 'Short Code', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const LABEL_LIST_FIELD = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]

export const PROBLEM_LIST_FIELD = [
  { key: 'name', label: 'Problem' },
  { key: 'diagnosisName', label: 'Diagnosis', isSort: true },
  { key: 'goals', label: 'Goal', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const LESSON_LIST_FIELD = [
  { key: 'name', label: 'lesson Name' },
  { key: 'assignedQuestionnaire', label: 'Assigned Questionnaire', isSort: true }
]
export const ASSIGNED_QUESTIONNAIRE_LIST_FIELD = [
  { key: 'questionnaireName', label: 'Questionnaire', isSort: true },
  { key: 'lessonName', label: 'Lesson Name', isSort: true }
]
export const EMAIL_TYPE_LIST_FIELD = [
  { key: 'name', label: 'Email Type' },
  { key: 'createdAt', label: 'Created On' }
]
export const EMAIL_TEMPLATE_LIST_FIELD = [
  { key: 'name', label: 'Template' },
  { key: 'email_type_name', label: 'Type' },
  { key: 'createdAt', label: 'Created On' }
]
export const GOAL_LIST_FIELD = [
  { key: 'name', label: 'Goal' },
  { key: 'goal_type', label: 'Goal Type', isSort: true },
  { key: 'short_description', label: 'Short Description', isSort: true },
  { key: 'interventions', label: 'Interventions', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const INTERVENTION_LIST_FIELD = [
  { key: 'name', label: 'Interventions' },
  { key: 'categoryName', label: 'Category', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]
export const CONTENT_PAGE_LIST_FIELD = [
  { key: 'name', label: ' Page Name' },
  { key: 'dependentOn', label: 'Dependent On', isSort: true },
  { key: 'createdAt', label: 'Created On' }
]

export const AUDIT_LOG_LIST_FIELD = [
  { key: 'actionModule', label: ' Screen' },
  { key: 'column', label: 'Column' },
  { key: 'oldValue', label: 'Old Value' },
  { key: 'newValue', label: 'New Value' },
  { key: 'actionType', label: 'Action' },
  { key: 'createdAt', label: 'Created On' },
  { key: 'actionBy', label: 'Created By' }
]








