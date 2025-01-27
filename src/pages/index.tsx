import { useState } from 'react';
import { MODELSEnum, SYNTAX, TemplateEnum } from '../lib/prompt-by-template';
import axios from 'axios';
import { Diagram } from '../components/diagram';
import SelectTemplate from '../components/select-template';
import { Select } from 'antd';

const Models = [
	{ value: MODELSEnum.LLAMA_3_1, label: MODELSEnum.LLAMA_3_1 }
];

const syntaxes = [
	{ value: SYNTAX.MERMAID, label: 'Mermaid' },
	{ value: SYNTAX.PLANT_UML, label: 'Plant UML' },
];

export default function Home() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState('');
	const [selectedTemplate, setSelectedTemplate] = useState<string>(TemplateEnum.SEQUENCE);
	const [selectedModel, setSelectedModel] = useState<string>(MODELSEnum.LLAMA_3_1);
	const [syntax, setSyntax] = useState<string>(SYNTAX.PLANT_UML);

	const name = input ? input.replace(/\s/g, '-').toLowerCase() : '';

	const [chart, setChart] = useState('');

	const handleOnSyntaxChange = (v: string) => {
		setChart('');
		setSyntax(v);
	};

	const handleFlow = async (e: any) => {
		e.preventDefault();
		if (!input && !loading) return;
		setLoading(true);

		try {
			const res = await axios.post('/api/ask', {
				input,
				selectedTemplate,
				Model: selectedModel,
				syntax,
			});

			if (res.data.text) {
				console.log(res.data.text);
				setChart(res.data.text);
			} else {
				setError('Sorry! a small issue occurred');
			}
		} catch (e) {
			console.log(e);
			setError('Sorry! a small issue occurred');
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='flex h-screen flex-col items-center'>
			{/* <Nav /> */}

			<div className='flex h-full w-full p-1'>
				<div className='flex h-full w-1/3 flex-col gap-5 p-4'>
					<SelectTemplate onChange={(value) => setSelectedTemplate(value)} />
					<form onSubmit={handleFlow} className='flex h-full flex-col gap-5'>
						<div className='relative h-5/6'>
							<textarea
								className='absolute left-0 top-0 h-full w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder='Describe your use case'
							/>
						</div>

						<button className=' rounded-md bg-teal-500 p-2 text-white disabled:text-white' disabled={loading}>
							{loading ? 'Loading...' : 'Generate'}
						</button>
					</form>
				</div>
				<div className='relative flex flex-1 border-2 border-dashed'>
					<div className='absolute left-4 top-3 z-10 flex w-full gap-3'>
						<Select options={Models} value={selectedModel} onChange={setSelectedModel} size={'large'} />
						<Select options={syntaxes} value={syntax} onChange={handleOnSyntaxChange} size={'large'} />
					</div>
					{loading ? (
						<div className='flex w-full animate-pulse items-center justify-center'>
							<h1 className='text-7xl font-black'>Loading...</h1>
						</div>
					) : (
						<>
							{!!chart ? (
								<Diagram chart={chart} name={name} syntax={syntax} />
							) : (
								<div className='flex w-full flex-col items-center justify-center'>
									<div>
										<h1 className='text-7xl font-black'>Diagram</h1>
										<h3 className='text-8xl font-black text-slate-500'>Generation</h3>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
