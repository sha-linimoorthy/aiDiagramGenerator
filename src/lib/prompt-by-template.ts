export enum TemplateEnum {
	FLOWCHART = "FLOWCHART",
	MINDMAP = "MINDMAP",
	TIMELINE = "TIMELINE",
	USERJOURNEY = "USERJOURNEY",
	CLASS = 'CLASS',
	ENTITYRELATIONSHIP = "ENTITYRELATIONSHIP",
	SEQUENCE = 'SEQUENCE',
	STATE = 'STATE',
}

export enum MODELSEnum {
	LLAMA_3_1 = 'llama3.1'
}

export const SYNTAX = {
	MERMAID: 'mermaid',
	PLANT_UML: 'plantUML',
} as const;
