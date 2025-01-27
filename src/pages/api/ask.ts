import { generate } from '@/lib/generate';
import { MODELSEnum, TemplateEnum } from '@/lib/prompt-by-template';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
	maxDuration: 60,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log('Request Body:', req.body); 
	const {
		input,
		selectedTemplate = TemplateEnum.SEQUENCE,
		Model = MODELSEnum.LLAMA_3_1,
		syntax = 'plantUML',
	} = req.body;

	if (!input) {
		return res.status(400).json({ message: 'No input in the request' });
	}

	try {
		const ans = await generate({ input, selectedTemplate, Model, syntaxName: syntax });
		console.log('ans ', ans);
		const text =
			syntax === 'mermaid'
				? ans
						.replaceAll('```', '')
						.replaceAll(`end[End]`, `ends[End]`)
						.replace('mermaid', '')
				: ans.replaceAll('```', '').replaceAll('plantuml', '');

		return res.status(200).json({ text });
	} catch (e: any) {
		console.error('Error during generation:', e); // Log the error
		return res.status(400).json(e);
	}
}
