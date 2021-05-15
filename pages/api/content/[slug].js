import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();

export default (req, res) => {
	if (req.method !== "GET")
		return res
			.status(405)
			.json({ message: `${req.method} method not allowed` });

	const { type, slug } = req.query;
	if (!type)
		return res
			.status(400)
			.json({ message: "Please provide the type of content" });

	try {
		const file = fs.readFileSync(
			path.join(root, "data", type, `${slug}.mdx`),
			"utf8"
		);
		const { data, content } = matter(file);
		return res
			.status(200)
			.json({ message: "success", post: { content, data } });
	} catch (error) {
		return res.status(404).json({
			message: "Error opening file, please check the file type and slug",
			error,
		});
	}
};
