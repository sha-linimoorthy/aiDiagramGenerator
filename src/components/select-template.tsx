import { TemplateEnum } from '@/lib/prompt-by-template';
import { Select } from 'antd';
import { FunctionComponent } from 'react';

interface ITemplate {
	label: string;
	value: TemplateEnum;
}

export const templates: ITemplate[] = [
	// { label: "Flowchart", value: TemplateEnum.FLOWCHART },
	// { label: "Mindmap", value: TemplateEnum.MINDMAP },
	// { label: "Timeline", value: TemplateEnum.TIMELINE },
	// { label: "User Journey", value: TemplateEnum.USERJOURNEY },
	// { label: "Entity Relationship", value: TemplateEnum.ENTITYRELATIONSHIP },
	{ label: 'Диаграмма последовательности', value: TemplateEnum.SEQUENCE },
	{ label: 'Диаграмма состояний', value: TemplateEnum.STATE },
	{ label: 'Диаграмма классов', value: TemplateEnum.CLASS },
];

interface ISelectTemplate {
	onChange: (value: string) => void;
}

const SelectTemplate: FunctionComponent<ISelectTemplate> = ({ onChange }) => {
	return (
		<div>
			<div className='text-sm text-gray-500'>Выберите тип диаграммы</div>
			<Select
				className='w-full'
				size={'large'}
				defaultValue={TemplateEnum.SEQUENCE}
				onChange={onChange}
				options={templates}
			/>
		</div>
		// <select onChange={onChange} className="select select-bordered select-lg">
		//   {templates.map((item) => (
		//     <option value={item.value} key={item.label}>
		//       {item.label}
		//     </option>
		//   ))}
		// </select>
	);
};

export default SelectTemplate;
