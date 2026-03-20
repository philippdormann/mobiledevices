import got from "got";
import fs from "fs";
import Papa from "papaparse";
//
got
	.get("https://storage.googleapis.com/play_public/supported_devices.csv")
	.text()
	.then((res) => {
		let result = Papa.parse(res, { skipEmptyLines: true }).data;
		const alldevices = [];
		result.shift();
		result.forEach((d) => {
			const brand = (d[0] || "")
				.replaceAll("\x00", "")
				.replaceAll("\n", "")
				.replaceAll('"', "");
			let name = (d[1] || "")
				.replaceAll("\x00", "")
				.replaceAll("\n", "")
				.replaceAll('"', "");
			if (name.startsWith(`${brand} `)) {
				name = name.replace(`${brand} `, "");
			}
			const device = (d[2] || "")
				.replaceAll("\x00", "")
				.replaceAll("\n", "")
				.replaceAll('"', "");
			const model = (d[3] || "")
				.replaceAll("\x00", "")
				.replaceAll("\n", "")
				.replaceAll('"', "");
			alldevices.push({ brand, name, device, model });
		});
		got
			.get("https://api.appledb.dev/device/main.json")
			.json()
			.then((devices) => {
				devices.forEach((d) => {
					const brand = "Apple";
					let name = d.name;
					if (name.startsWith(`${brand} `)) {
						name = name.replace(`${brand} `, "");
					}
					const device = d.key;
					const model = d.key;
					alldevices.push({ brand, name, device, model });
				});
				let filecontent = fs.readFileSync("./packages/lib/index.js", {
					encoding: "utf8",
				});
				filecontent = filecontent.replace(
					"export const devices = [];",
					`export const devices = ${JSON.stringify(alldevices)};`
				);
				fs.writeFileSync("./packages/lib/index.js", filecontent);
			});
	});
