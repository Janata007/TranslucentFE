export const HelperFunctions = {
  getDateAsReadableText(date) {
    const readableDate = new Date(Date.parse(date)).toLocaleDateString("en-UK");
    if (readableDate !== "Invalid Date") return readableDate;
    else return "what most likely was a Friday";
  },

  checkForEmptyFields(data) {
    return Object.values(data).every((field) => field.length > 0);
  },

  checkPasswordRequirements(password) {
    let passwordValidator = {
      isValid: true,
      messages: [],
    };

    if (!/^.{6,}$/.test(password))
      passwordValidator.messages.push("Should be at least six characters long");
    if (!/(?=.*[a-z])/.test(password))
      passwordValidator.messages.push("Have one lowercase letter");
    if (!/(?=.*[A-Z])/.test(password))
      passwordValidator.messages.push("Have one uppercase letter");
    if (!/(?=.*\d)/.test(password))
      passwordValidator.messages.push("Have one digit");
    if (passwordValidator.messages.length > 0)
      passwordValidator.isValid = false;

    return passwordValidator;
  },

  getErrorMessageForFailingResponse(responseMessage) {
    switch (responseMessage) {
      case "NO ACCOUNT":
        return "No account found, please check your credentials and try again";
      case "NOT CONFIRMED":
        return "Please check your email and confirm your account before logging in";
      case "INVALID PASSWORD":
        return "Invalid password for the given account";
      case "DUPLICATEUSERNAME":
        return "Username has already been taken, please try again with a different one";
      default:
        return "Error during submission, please try again later";
    }
  },

  applyFilters(tasks, filters, userId) {
    let filteredTasks = tasks;

    Object.entries(filters).forEach((filter) => {
      const [name, isApplied] = filter;

      switch (name) {
        case "showOnlyMyTasks":
          filteredTasks = isApplied
            ? this.showOnlyMyTasks(filteredTasks, userId)
            : filteredTasks;
          break;
        case "showHiddenTasks":
          filteredTasks = isApplied
            ? filteredTasks
            : this.filterHiddenTasks(tasks, false);
          break;

        default:
          break;
      }
    });

    this.sortTasksByDueDate(filteredTasks);
    return filteredTasks;
  },

  sortTasksByDueDate(tasks) {
    tasks.length > 0
      ? tasks.sort((t1, t2) => {
          const date1 = Date.parse(t1.dueDate);
          const date2 = Date.parse(t2.dueDate);

          return date1 > date2 ? -1 : 1;
        })
      : null;
  },

  showOnlyMyTasks(tasks, userId) {
    return tasks.length > 0 ? tasks.filter((t) => t.userId === userId) : tasks;
  },

  filterHiddenTasks(tasks, hidden) {
    return tasks.length > 0
      ? tasks.filter((p) => p.isHidden === hidden)
      : tasks;
  },
};
