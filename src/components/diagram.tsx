import { Dropdown, Button, MenuProps } from 'antd';
import mermaid from 'mermaid';
import { FC, useEffect, useMemo } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { DownloadOutlined } from '@ant-design/icons';
import plantumlEncoder from 'plantuml-encoder';
import axios from 'axios';

interface IDiagram {
	chart: string;
	name: string;
	syntax: string;
}

const downloadBlob = (blob: Blob, fileName: string) => {
	const svgUrl = URL.createObjectURL(blob);

	const downloadLink = document.createElement('a');
	downloadLink.href = svgUrl;
	downloadLink.download = fileName;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
};

const exportMermaidSvg = async (chart: string, name: string) => {
	const svgData = await mermaid.render('text1', chart);

	const svgBlob = new Blob([svgData.svg], {
		type: 'image/svg_xml;charset=utf-8',
	});

	downloadBlob(svgBlob, `${name}.svg`);
};

const exportPlantUMLSvg = async (chart: string, name: string) => {
	const response = await axios.get('https://www.plantuml.com/plantuml/svg/' + plantumlEncoder.encode(chart), {
		responseType: 'blob',
	});
	downloadBlob(response.data, `${name}.svg`);
};

export const Diagram: FC<IDiagram> = ({ chart, name, syntax }) => {
	useEffect(() => {
		if (chart) mermaid.contentLoaded();
	}, [chart]);

	const items: MenuProps['items'] = useMemo(
		() => [
			{
				key: 'svg',
				label: 'SVG',
				onClick: () => (syntax === 'mermaid' ? exportMermaidSvg(chart, name) : exportPlantUMLSvg(chart, name)),
			},
		],
		[chart, name, syntax],
	);

	return (
		<div className='relative flex w-full justify-center'>
			<div className='dropdown dropdown-end absolute bottom-1 right-1 z-50 m-2'>
				<Dropdown trigger={['click']} menu={{ items }} placement='topRight'>
					<Button size='large' icon={<DownloadOutlined />}>
						Экспорт
					</Button>
				</Dropdown>
			</div>

			<TransformWrapper centerOnInit initialScale={2}>
				<TransformComponent wrapperStyle={{ width: '100%', height: '100%', textAlign: 'center' }}>
					{syntax === 'mermaid' ? (
						<div className='mermaid mb-100 h-full w-full'>{chart}</div>
					) : (
						<div className='mb-100 h-full w-full'>
							<img src={'https://www.plantuml.com/plantuml/svg/' + plantumlEncoder.encode(chart)} alt='plantUML' />
						</div>
					)}
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
};
