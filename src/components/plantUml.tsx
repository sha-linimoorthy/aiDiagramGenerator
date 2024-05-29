import { Dropdown, Button } from 'antd';
import { FunctionComponent } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import plantumlEncoder from 'plantuml-encoder';
import Image from 'next/image';

interface PlantUmlProps {
	chart: string;
}

const PlantUml: FunctionComponent<PlantUmlProps> = ({ chart }) => {
	return (
		<div className='relative flex w-full justify-center'>
			{/* <div className='dropdown dropdown-end absolute bottom-1 right-1 z-50 m-2'>
				<Dropdown trigger={['click']} menu={{ items }} placement='topRight'>
					<Button size='large' icon={<DownloadOutlined />}>
						Экспорт
					</Button>
				</Dropdown>
			</div> */}

			<TransformWrapper centerOnInit initialScale={2}>
				<TransformComponent wrapperStyle={{ width: '100%', height: '100%', textAlign: 'center' }}>
					<div className='mb-100 h-full w-full'>
						<img src={'https://www.plantuml.com/plantuml/svg/' + plantumlEncoder.encode(chart)} alt='plantUML' />
					</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	);
};

export default PlantUml;
