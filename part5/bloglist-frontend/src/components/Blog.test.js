import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog />", () => {
	const dummyBlog = {
		author: "Dummy",
		title: "dummy title",
		url: "dummyurl.com",
		likes: 0,
	}

	test("displays author and title but not url or likes", () => {
		const component = render(<Blog blog={dummyBlog} />)
		expect(component.container).toHaveTextContent(dummyBlog.author)
		expect(component.container).toHaveTextContent(dummyBlog.title)
		expect(component.container).not.toHaveTextContent(dummyBlog.url)
		expect(component.container).not.toHaveTextContent(dummyBlog.likes)
	})

	test("url and likes are displayed after click", () => {
		const component = render(<Blog blog={dummyBlog} />)
		const btn = component.getByText("view")
		fireEvent.click(btn)
		expect(component.container).toHaveTextContent(dummyBlog.url)
		expect(component.container).toHaveTextContent(dummyBlog.likes)
	})

	test("if like button clicked twice, component received as props is called twice", () => {
		const mockHandler = jest.fn()
		const component = render(
			<Blog blog={dummyBlog} likeHandler={mockHandler} />
		)
		const viewBtn = component.getByText("view")
		fireEvent.click(viewBtn)

		const likeBtn = component.getByText("like")
		fireEvent.click(likeBtn)
		fireEvent.click(likeBtn)
		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
