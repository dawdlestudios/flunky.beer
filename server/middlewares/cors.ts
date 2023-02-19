import Cors from "cors";

const whitelist = ["http://localhost:3000"];

export const cors = Cors({
	origin: (origin, callback) => {
		return whitelist.includes(origin ?? "")
			? callback(null, true)
			: callback(new Error("Not allowed by CORS"));
	},
});
