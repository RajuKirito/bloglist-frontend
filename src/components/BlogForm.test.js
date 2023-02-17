import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("Blog Form calls the handleSubmit function when the form is submitted", async () => {
  const mockFn = jest.fn();

  render(
    <BlogForm
      handleCreateBlog={mockFn}
      title="Raju"
      url="udontneedit"
      author="raju"
    />
  );

  const submit = screen.getByText("create");

  const user = userEvent.setup();
  await user.click(submit);

  expect(mockFn.mock.calls).toHaveLength(1);
});
