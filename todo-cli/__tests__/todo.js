/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
  });
  test("A test that checks creating a new todo.", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo 2",
      completed: false,
      dueDate: new Date(),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("A test that checks marking a todo as completed.", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("A test that checks retrieval of overdue items.", () => {
    let overdues = overdue();
    let overdueCount = overdues.length;
    add({
      title: "Test todo 3",
      completed: false,
      dueDate: yesterday,
    });
    overdues = overdue();
    expect(overdues.length).toBe(overdueCount + 1);
  });

  test("A test that checks retrieval of due today items.", () => {
    let todays = dueToday();
    let todayCount = todays.length;
    add({
      title: "Test todo 4",
      completed: false,
      dueDate: today,
    });
    todays = dueToday();
    expect(todays.length).toBe(todayCount + 1);
  });

  test("A test that checks retrieval of due later items.", () => {
    let tomorrows = dueLater();
    let tomorrowCount = tomorrows.length;
    add({
      title: "Test todo 5",
      completed: false,
      dueDate: tomorrow,
    });
    tomorrows = dueLater();
    expect(tomorrows.length).toBe(tomorrowCount + 1);
  });
});
