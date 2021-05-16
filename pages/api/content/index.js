import fs from "fs";
import path from "path";

const root = process.cwd();

const getFiles = async (loc) => {
	const entries = fs.readdirSync(loc, { withFileTypes: true });

	const files = entries
		.filter((file) => !file.isDirectory())
		.map((file) => ({
			...file,
			name: file.name.replace(".mdx", ""),
			type: loc.split("/data/")[1].slice(0, -1),
		}));

	const folders = entries.filter((folder) => folder.isDirectory());

	for (const folder of folders)
		files.push(...(await getFiles(`${loc}/${folder.name}/`)));

	return files;
};

export default async (req, res) => {
	if (req.method !== "GET")
		return res
			.status(405)
			.json({ message: `${req.method} method not allowed` });

	const { type } = req.query;

	try {
		let files;
		if (type) {
			files = fs.readdirSync(path.join(root, "data", type));
		} else {
			files = await getFiles(path.join(root, "data"));
		}

		return res.status(200).json({ message: "success", files });
	} catch (error) {
		return res.status(404).json({
			message: "Error opening directory, please check the file type",
			error,
		});
	}
};
