import { AwsClient } from "aws4fetch";

const r2 = new AwsClient({
	accessKeyId: process.env.ACCESS_KEY!,
	secretAccessKey: process.env.ACCESS_SECRET!,
});

export const getPresignedSignedUrl = async (key: string) => {
	const url = new URL(`https://b307e5710182c9d6bf2fe2241dc2e34c.r2.cloudflarestorage.com/flunkybeer/${key}`);

	// Specify a custom expiry for the presigned URL, in seconds
	url.searchParams.set("X-Amz-Expires", "3600");

	const signed = await r2.sign(
		new Request(url, {
			method: "PUT",
			headers: {
				"Content-Type": "image/jpeg",
			},
		}),
		{
			aws: { signQuery: true },
		},
	);

	return signed.url;
};

export const deleteImage = async (key: string) => {
	const url = new URL(`https://b307e5710182c9d6bf2fe2241dc2e34c.r2.cloudflarestorage.com/flunkybeer/${key}`);
	return r2.fetch(
		new Request(url, {
			method: "DELETE",
		}),
	);
};
