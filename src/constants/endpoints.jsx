const BASE_URL_DEV = "http://localhost:9191";
const BASE_URL_PRODUCTION = "";

const ENDPOINTS = {
  //WORK_SERVICE
  WORK_SERVICE: "work",
  GET_TASKS_FOR_USER: "tasks",
  CREATE_TASK: "create-task",
  UPDATE_TASK: "update-task",
  DELETE_TASK_BY_ID: "delete-task-by-id",
  TOGGLE_TASK_HIDDEN: "toggle-task-visibility",
  TOGGLE_USER_FOR_TASK: "toggle-user-for-task",

  //USER_SERVICE
  USER_SERVICE: "users",
  GET_ALL_USERS: "all",

  //AUTH
  LOGIN: "login",
  REGISTER: "register",
};

const development = {
  //WORK SERVICE
  GET_TASKS_FOR_USER: `${BASE_URL_DEV}/${ENDPOINTS.WORK_SERVICE}/${ENDPOINTS.GET_TASKS_FOR_USER}`,
  CREATE_TASK: `${BASE_URL_DEV}/${ENDPOINTS.WORK_SERVICE}/${ENDPOINTS.CREATE_TASK}`,
  DELETE_TASK_BY_ID: `${BASE_URL_DEV}/${ENDPOINTS.WORK_SERVICE}/${ENDPOINTS.DELETE_TASK_BY_ID}`,
  TOGGLE_TASK_HIDDEN: `${BASE_URL_DEV}/${ENDPOINTS.WORK_SERVICE}/${ENDPOINTS.TOGGLE_TASK_HIDDEN}`,
  TOGGLE_USER_FOR_TASK: `${BASE_URL_DEV}/${ENDPOINTS.WORK_SERVICE}/${ENDPOINTS.TOGGLE_USER_FOR_TASK}`,

  //USERS
  GET_ALL_USERS: `${BASE_URL_DEV}/${ENDPOINTS.USER_SERVICE}/${ENDPOINTS.GET_ALL_USERS}`,

  //AUTH
  LOGIN: `${BASE_URL_DEV}/${ENDPOINTS.LOGIN}`,
  REGISTER: `${BASE_URL_DEV}/${ENDPOINTS.REGISTER}`,
};

const ENDPOINT__URLS =
  process.env.NODE_ENV === "development" ? development : production;

export default ENDPOINT__URLS;