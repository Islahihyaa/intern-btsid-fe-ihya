export const handleCreatedList = (response, lists) => {
  const listExists = lists.some((list) => list.listId === response.listId);
  if (!listExists) {
    lists.push(response);
  }
};

export const handleCreatedTask = (response, lists) => {
  const { listId, taskTitle, taskId } = response;

  const listOnTask = lists.find((list) => list.listId === listId);

  if (listOnTask) {
    const taskExists = listOnTask.tasks.some((task) => task.taskId === taskId);
    if (!taskExists) {
      listOnTask.tasks.push({ taskId, taskTitle });
    }
  }
};

export const handleUpdatedTask = (response, lists) => {
  const { oldListId, newListId, taskId, taskTitle } = response;

  const oldList = lists.find((list) => list.listId === oldListId);
  if (oldList) {
    const taskIndex = oldList.tasks.findIndex((task) => task.taskId === taskId);
    if (taskIndex > -1) {
      oldList.tasks.splice(taskIndex, 1);
    }
  }

  const newList = lists.find((list) => list.listId === newListId);
  if (newList) {
    const taskExists = newList.tasks.some((task) => task.taskId === taskId);
    if (!taskExists) {
      newList.tasks.push({ taskId, taskTitle });
    }
  }
};
