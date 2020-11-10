import multiTaskDrag, { selectTasks, unselectTasks, unselectAllTasks } from "./multiTaskDragSlice";

describe("multiTaskDragSlice", () => {
  test("selects tasks", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: [] },
      {
        type: selectTasks.type,
        payload: { taskIds: ["id-1", "id-2"] },
      }
    );

    expect(nextState.selectedTaskIds).toEqual(["id-1", "id-2"]);
  });

  test("unselects tasks", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: unselectTasks.type,
        payload: { taskIds: ["id-4", "id-6", "id-7"] },
      }
    );

    expect(nextState.selectedTaskIds).toEqual(["id-1", "id-2", "id-3", "id-5"]);
  });

  test("unselects all tasks", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: unselectAllTasks.type,
      }
    );

    expect(nextState.selectedTaskIds).toEqual([]);
  });
});
