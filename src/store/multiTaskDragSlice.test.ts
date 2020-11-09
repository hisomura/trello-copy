import multiTaskDrag, { addTaskIds, deleteTaskIds, clearTaskIds } from "./multiTaskDragSlice";

describe("multiTaskDragSlice", () => {
  test("adds taskIds", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: [] },
      {
        type: addTaskIds.type,
        payload: { taskIds: ["id-1", "id-2"] },
      }
    );

    expect(nextState.selectedTaskIds).toEqual(["id-1", "id-2"]);
  });

  test("deletes taskIds", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: deleteTaskIds.type,
        payload: { taskIds: ["id-4", "id-6", "id-7"] },
      }
    );

    expect(nextState.selectedTaskIds).toEqual(["id-1", "id-2", "id-3", "id-5"]);
  });

  test("clears taskIds", () => {
    const nextState = multiTaskDrag(
      { selectedTaskIds: ["id-1", "id-2", "id-3", "id-4", "id-5", "id-6"] },
      {
        type: clearTaskIds.type,
      }
    );

    expect(nextState.selectedTaskIds).toEqual([]);
  });
});
