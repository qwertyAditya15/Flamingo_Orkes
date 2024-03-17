import {
	orkesConductorClient,
	simpleTask,
	WorkflowExecutor,
} from "@io-orkes/conductor-javascript";

const orkesKeyId = process.env["orkesKeyId"] as string;
const orkesSecret = process.env["orkesSecret"] as string;
// API client instance with server address and authentication details

console.log(orkesKeyId, orkesSecret);
const clientPromise = orkesConductorClient({
	keyId: orkesKeyId,
	keySecret: orkesSecret,
	serverUrl: "https://play.orkes.io/api",
});

const client = await clientPromise;

// Create new workflow executor
const executor = new WorkflowExecutor(client);

// Using Factory function
const factoryWf = {
	name: "my_first_workflow",
	version: 1,
	ownerEmail: "developers@orkes.io",
	tasks: [simpleTask("simple_task_ref", "simple_task", {})],
	inputParameters: [],
	outputParameters: {},
	timeoutSeconds: 0,
};
const workflow = executor.registerWorkflow(true, factoryWf);
console.log(workflow);
