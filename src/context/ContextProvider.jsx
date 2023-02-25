import { React, useReducer } from "react";

import AppContext from "./AppContext";

export const defaultAppState = {
  tasks: [],
  modalVisibility: {
    createTask: false,
    updateTask: false,
    deleteTask: false,
    setTaskToFinished: false,
  },
  taskBeingModified: {
    taskId: null,
    name: "",
    description: "",
    priority: "",
    finished: "",
    accepted: "",
    dateDue: "",
    index: null,
  },
};

export const appReducer = (state, action) => {
  let tasks;
  let taskBeingModifiedIndex;

  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modalVisibility: { ...state.modalVisibility, [action.modal]: true },
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        modalVisibility: { ...state.modalVisibility, [action.modal]: false },
      };

    case "LOAD_TASKS":
      return { ...state, tasks: action.tasks };

    case "MODIFYING_TASK":
      return { ...state, taskBeingModified: action.task };

    case "DELETED_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((p) => p.taskId !== action.taskId)],
      };

    case "UPDATED_TASK":
      taskBeingModifiedIndex = [...state.tasks].findIndex(
        (p) => p.taskId === action.task.taskId
      );
      tasks = [...state.tasks];

      tasks[taskBeingModifiedIndex].name = action.task.name;
      tasks[taskBeingModifiedIndex].description = action.task.description;
      tasks[taskBeingModifiedIndex].priority = action.task.priority;
      tasks[taskBeingModifiedIndex].finished = action.task.finished;
      tasks[taskBeingModifiedIndex].accepted = action.task.accepted;
      tasks[taskBeingModifiedIndex].dateDue = new Date().toISOString();

      return { ...state, tasks: tasks };

    case "CREATED_TASK":
      tasks = [...state.tasks];

      tasks.push(action.task);

      return { ...state, tasks: tasks };

    case "TOGGLE_TASK_HIDDEN":
      taskBeingModifiedIndex = [...state.tasks].findIndex(
        (t) => t.taskId === action.taskId
      );
      tasks = [...state.tasks];

      tasks[taskBeingModifiedIndex].isHidden =
        !tasks[taskBeingModifiedIndex].isHidden;
      //   tasks[taskBeingModifiedIndex].dateDue = new Date().toISOString();

      return { ...state, tasks: tasks };

    case "TOGGLED_USER":
      taskBeingModifiedIndex = [...state.tasks].findIndex(
        (t) => t.taskId == action.taskId
      );
      tasks = [...state.tasks];

      if (action.isAdded)
        tasks[taskBeingModifiedIndex].allowedUsers.push(action.username);
      else
        tasks[taskBeingModifiedIndex].allowedUsers = tasks[
          taskBeingModifiedIndex
        ].allowedUsers.filter((u) => u !== action.username);

      return { ...state, tasks: tasks };

    default:
      return defaultAppState;
  }
};

const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, defaultAppState);

  const appContext = {
    tasks: appState.tasks,
    modalVisibility: appState.modalVisibility,
    postBeingModified: appState.taskBeingModified,

    dispatch: dispatch,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
