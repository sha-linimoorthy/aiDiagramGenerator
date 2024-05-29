import { LLMChain, OpenAI, PromptTemplate } from 'langchain';
import { GPTMODELSEnum, TemplateEnum, TemplateInRussianEnum } from './prompt-by-template';

export const generate = async ({
	input,
	selectedTemplate,
	gptModel,
	syntaxName,
}: {
	input: any;
	selectedTemplate: TemplateEnum;
	gptModel: GPTMODELSEnum;
	syntaxName: string;
}) => {
	try {
		const model = new OpenAI({ modelName: gptModel, temperature: 0.7 });

		const template =
			'Изучи этот {syntaxName} синтаксис: {syntaxDoc}. Используя этот синтаксис напиши диаграмму {template} на основе данного текста: {input}. {instructions}';

		const prompt = new PromptTemplate({
			template,
			inputVariables: ['template', 'input', 'syntaxName', 'syntaxDoc', 'instructions'],
		});

		const chain = new LLMChain({ llm: model, prompt });

		const syntaxDoc = await import(`./syntax/${syntaxName}/${selectedTemplate.toLowerCase()}.md`);

		console.log(syntaxName);

		const res = await chain.call({
			template: TemplateInRussianEnum[selectedTemplate],
			input,
			syntaxDoc: syntaxDoc.default,
			syntaxName,
			instructions: `
            - используй разные фигуры, цвета и иконки по возможности как указано в синтаксисе.
            - строгие правила: не используй заметки, верни только код в указанном синтаксисе, не объясняй код и не добавляй любой другой текст, кроме самого кода,
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
