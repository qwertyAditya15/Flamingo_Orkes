import {
	ConductorClient,
	OrkesApiConfig,
	orkesConductorClient,
} from "@io-orkes/conductor-javascript";

const orkesKeyId = process.env["orkesKeyId"] as string;
const orkesSecret = process.env["orkesSecret"] as string;

const config: Partial<OrkesApiConfig> = {
	keyId: orkesKeyId,
	keySecret: orkesSecret,
	refreshTokenInterval: 0,
	serverUrl: "https://play.orkes.io/api",
};

let client: ConductorClient | null = null;

export async function getConductorClient() {
	if (client) return client;
	client = await orkesConductorClient(config);
	return client;
}
