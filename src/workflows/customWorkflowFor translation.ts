import { ConductorWorker, TaskManager } from "@io-orkes/conductor-javascript";

import { getConductorClient } from "@/client.orkes";

const client = await getConductorClient();

const taskDefName = "LLMWorker";

const customWorker: ConductorWorker = {
	taskDefName,
	execute: async () => {
		// { inputData, taskId }
		return {
			outputData: {
				greeting: "Translated Data:",
			},
			status: "COMPLETED",
		};
	},
};
// Worker Options will take precedence over options defined in the manager

const manager = new TaskManager(client, [customWorker], {
	options: { pollInterval: 100, concurrency: 1 },
});

export default manager;

manager.startPolling();

// You can update all worker settings at once using
manager.updatePollingOptions({ pollInterval: 100, concurrency: 1 });

// You can update a single worker setting using :
manager.updatePollingOptionForWorker(taskDefName, {
	pollInterval: 100,
	concurrency: 1,
});

manager.isPolling; // Will resolve to true

await manager.stopPolling();

manager.isPolling; // Will resolve to false
