import { React, createContext } from "react";

const AppContext = createContext({
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
});

export default AppContext;
