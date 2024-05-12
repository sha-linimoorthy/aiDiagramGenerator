import { useState } from 'react';
import { GPTMODELSEnum, TemplateEnum } from '@/lib/prompt-by-template';
import axios from 'axios';
import { Mermaid } from '@/components/mermaid';
import SelectTemplate from '@/components/select-template';
import { Select } from 'antd';

// const inter = Inter({ subsets: ["latin"] });

const gptModels = [
	{ value: GPTMODELSEnum.GPT_4_TURBO, label: GPTMODELSEnum.GPT_4_TURBO },
	{ value: GPTMODELSEnum.GPT_3_5_TURBO, label: GPTMODELSEnum.GPT_3_5_TURBO },
];

export default function Home() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState('');
	const [selectedTemplate, setSelectedTemplate] = useState<string>(TemplateEnum.SEQUENCE);
	const [selectedGPTModel, setSelectedGPTModel] = useState<string>(GPTMODELSEnum.GPT_4_TURBO);

	const name = input ? input.replace(/\s/g, '-').toLowerCase() : '';

	const [chart, setChart] = useState('');

	const handleFlow = async (e: any) => {
		e.preventDefault();
		if (!input && !loading) return;
		setLoading(true);

		try {
			const res = await axios.post('/api/ask', {
				input,
				selectedTemplate,
				gptModel: selectedGPTModel,
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
								placeholder='Опишите процесс'
							/>
						</div>

						<button className=' rounded-md bg-teal-500 p-2 text-white disabled:text-white' disabled={loading}>
							{loading ? 'Загрузка...' : 'Сгенерировать'}
						</button>
					</form>
				</div>
				<div className='relative flex flex-1 border-2 border-dashed'>
					<div className='absolute left-4 top-3 z-10'>
						<Select options={gptModels} value={selectedGPTModel} onChange={setSelectedGPTModel} size={'large'} />
					</div>
					{loading ? (
						<div className='flex w-full animate-pulse items-center justify-center'>
							<h1 className='text-7xl font-black'>Loading...</h1>
						</div>
					) : (
						<>
							{!!chart ? (
								<Mermaid chart={chart} name={name} />
							) : (
								<div className='flex w-full flex-col items-center justify-center'>
									<div>
										<h1 className='text-7xl font-black'>Генерация</h1>
										<h3 className='text-8xl font-black text-success'>диаграмм</h3>
										<h2 className='text-5xl font-black'>с применением ИИ</h2>
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
