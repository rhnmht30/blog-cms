import fs from "fs";
import path from "path";

const root = process.cwd();

export default (req, res) => {
	if (req.method !== "GET")
		return res
			.status(405)
			.json({ message: `${req.method} method not allowed` });

	const { type } = req.query;
	if (!type)
		return res
			.status(400)
			.json({ message: "Please provide the type of content" });

	try {
		console.log(root);
		const files = fs.readdirSync(path.join(root, "data", type));
		return res.status(200).json({ message: "success", files });
	} catch (error) {
		return res.status(400).json({ message: "error", error });
	}
};
