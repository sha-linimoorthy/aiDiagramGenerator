import { Icon } from '@iconify/react';

const Nav = () => {
	return (
		<div className='fixed left-0 top-0 z-50 w-full'>
			<nav className='footer flex items-center justify-between p-1 text-neutral-content'>
				<div className='grid-flow-col items-center'>
					<div className='badge badge-sm self-end'>Diagrams</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
