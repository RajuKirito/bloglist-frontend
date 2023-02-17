import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("only title and author appear by default in a blog", () => {
  const blog = {
    title: "ganesh wrote this",
    author: "newton",
    url: "fasldkfj;asl",
    creator: {
      username: "ganesh"
    }
  };

  const container = render(<Blog blog={blog} />).container;
  const div = container.querySelector(".blogInvisible");
  //   console.log(div);
  expect(div).toHaveStyle({ display: "none" });
});

test("when show is clicked everything is displayed", async () => {
  const blog = {
    title: "ganesh wrote this",
    author: "newton",
    url: "fasldkfj;asl",
    creator: {
      username: "ganesh"
    }
  };
  const container = render(<Blog blog={blog} />).container;

  const div = container.querySelector(".blogInvisible");

  const show = screen.getByText("show");

  expect(div).toHaveStyle({ display: "none" });

  const user = userEvent.setup();
  await user.click(show);

  expect(div).not.toHaveStyle({ display: "none" });
});

test("when like is clicked twice the event handler is called twice", async () => {
  const blog = {
    title: "ganesh wrote this",
    author: "newton",
    url: "fasldkfj;asl",
    creator: {
      username: "ganesh"
    }
  };

  const mockUpdateLikes = jest.fn();

  render(<Blog blog={blog} handleUpdateBlog={mockUpdateLikes} />);

  const show = screen.getByText("show");

  const user = userEvent.setup();
  await user.click(show);

  const like = screen.getByText("like");
  await user.click(like);
  await user.click(like);

  expect(mockUpdateLikes.mock.calls).toHaveLength(2);
});
