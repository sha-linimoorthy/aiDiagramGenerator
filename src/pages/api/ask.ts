import { generate } from '@/lib/generate';
import { GPTMODELSEnum, TemplateEnum } from '@/lib/prompt-by-template';

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	maxDuration: 60,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		input,
		selectedTemplate = TemplateEnum.SEQUENCE,
		gptModel = GPTMODELSEnum.GPT_4_TURBO,
		syntax = 'plantUML',
	} = req.body;

	if (!input) {
		return res.status(400).json({ message: 'No input in the request' });
	}

	try {
		const ans = await generate({ input, selectedTemplate, gptModel, syntaxName: syntax });

		console.log('ans ', ans);

		const text =
			syntax === 'mermaid'
				? ans.text.replaceAll('```', '').replaceAll(`"`, `'`).replaceAll(`end[End]`, `ends[End]`).replace('mermaid', '')
				: ans.text.replaceAll('```', '').replaceAll('plantuml', '');

		return res.status(200).json({ text });
	} catch (e: any) {
		return res.status(400).json(e);
	}
}
