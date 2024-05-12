import { LLMChain, OpenAI, PromptTemplate } from 'langchain';
import { GPTMODELSEnum, TemplateEnum, TemplateInRussianEnum } from './prompt-by-template';

export const generate = async ({
	input,
	selectedTemplate,
	gptModel,
}: {
	input: any;
	selectedTemplate: TemplateEnum;
	gptModel: GPTMODELSEnum;
}) => {
	try {
		const model = new OpenAI({ modelName: gptModel, temperature: 0.2 });

		const template =
			'Изучи этот mermaid синтаксис: {syntax}. Используя этот синтаксис напиши диаграмму {template} на основе данного текста: {input}. {instructions}';

		const prompt = new PromptTemplate({
			template,
			inputVariables: ['template', 'input', 'syntax', 'instructions'],
		});

		const chain = new LLMChain({ llm: model, prompt });

		const syntaxDoc = await import(`./syntax/${selectedTemplate.toLowerCase()}.md`);

		console.log(TemplateInRussianEnum[selectedTemplate]);

		const res = await chain.call({
			template: TemplateInRussianEnum[selectedTemplate],
			input,
			syntax: syntaxDoc.default,
			instructions: `
            - используй разные фигуры, цвета и иконки по возможности как указано в синтаксисе.
            - строгие правила: не используй заметки, не объясняй код и не добавляй любой другой текст, кроме самого кода,
            - не используй 'end' - синтаксис
            - не используй box для диаграммы последовательности
            - не используй скобки внутри блоков
            - используй русский язык
            `,
		});

		return res;
	} catch (e: any) {
		console.log('openai:debug', e?.response);
		throw e;
	}
};
