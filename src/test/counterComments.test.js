import CommentsApi from "../commentsApi";

test("Display number of comments", () => {
  const arr = [
    {
      comment: "Hello",
      creation_date: "2022-02-05",
      username: "Jane",
    },
    {
      username: "Juan",
      creation_date: "2022-02-05",
      comment: "Hello world",
    },
    {
      username: "Gaby",
      comment: "Hi world",
      creation_date: "2022-02-05",
    },
  ];
  const counter = CommentsApi.counterComments(arr);
  expect(counter).toBe(3);
});
