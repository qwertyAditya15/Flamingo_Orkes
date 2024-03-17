import {
	orkesConductorClient,
	WorkflowExecutor,
} from "@io-orkes/conductor-javascript";

// Replace with your Conductor server configuration
const conductorConfig = {
	serverUrl: "http://localhost:8080/api", // Update if needed
	// ... other Conductor connection settings if required
};

// Replace with your translation service endpoint and API key
const translationServiceConfig = {
	uri: "https://your-translation-api-endpoint",
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		"Ocp-Apim-Subscription-Key": "YOUR_TRANSLATION_API_KEY",
	},
};

async function startWorkflow() {
	const client = await orkesConductorClient(conductorConfig);
	const workflowExecutor = new WorkflowExecutor(client);

	const translationWorkflow = {
		name: "hindi_to_english_translation",
		description: "Translates Hindi text to English",
		version: 1,
		tasks: [
			{
				name: "translate_text",
				taskReferenceName: "translate_text_task",
				type: "HTTP",
				inputParameters: {
					http_request: {
						...translationServiceConfig,
						body: {
							text: "${workflow.input.hindiText}", // Get Hindi text from workflow input
						},
					},
				},
			},
		],
		inputParameters: {
			hindiText: "", // Input for the workflow
		},
		outputParameters: {
			translatedText: "${translate_text_task.output.body.translatedText}", // Sample output path
		},
	};

	await workflowExecutor.registerWorkflow(true, translationWorkflow);
}

startWorkflow();
