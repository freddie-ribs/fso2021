const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const Blog = require("../models/blog")

const api = supertest(app)

const bloglist = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0,
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0,
	},
]

beforeEach(async () => {
	await Blog.deleteMany({})
	let blog = new Blog(bloglist[0])
	await blog.save()
	blog = new Blog(bloglist[1])
	await blog.save()
})

describe("return correct amount of blogs in json format", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)
	})

	test("return all blogs", async () => {
		const res = await api.get("/api/blogs")

		expect(res.body).toHaveLength(bloglist.length)
	})
})

afterAll(() => mongoose.connection.close())
