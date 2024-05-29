import { Dropdown, Button, MenuProps } from 'antd';
import mermaid from 'mermaid';
import { FC, useEffect, useMemo } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { DownloadOutlined } from '@ant-design/icons';

interface IMermaid {
	chart: string;
	name: string;
}

const exportSvg = async (chart: string, name: string) => {
	const svgData = await mermaid.render('text1', chart);

	const svgBlob = new Blob([svgData.svg], {
		type: 'image/svg_xml;charset=utf-8',
	});

	const svgUrl = URL.createObjectURL(svgBlob);

	const downloadLink = document.createElement('a');
	downloadLink.href = svgUrl;
	downloadLink.download = `${name}.svg`;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
};

export const Mermaid: FC<IMermaid> = ({ chart, name }) => {
	useEffect(() => {
		if (chart) mermaid.contentLoaded();
	}, [chart]);

	const items: MenuProps['items'] = useMemo(
		() => [
			{
				key: 'svg',
				label: 'SVG',
				onClick: () => exportSvg(chart, name),
			},
		],
		[chart, name],
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
					<div className='mermaid mb-100 h-full w-full'>{chart}</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
};
