import { Icon } from '@iconify/react';

const Nav = () => {
	return (
		<div className='fixed left-0 top-0 z-50 w-full'>
			<nav className='footer flex items-center justify-between p-1 text-neutral-content'>
				<div className='grid-flow-col items-center'>
					<div className='badge badge-sm self-end'>диаграммы</div>
				</div>
				{/* <div className="grid-flow-col gap-2 md:place-self-center md:justify-self-end mr-4 font-serif flex">
          <span>Made with Love by</span>
          <a
            href="https://twitter.com/kuluruvineeth"
            target="__blank"
            rel="noreferrer"
          >
            <Icon
              icon="akar-icons:twitter-fill"
              className="text-xl text-[#1DA1F2]"
            />
          </a>
          <a
            href="https://github.com/kuluruvineeth"
            target="__blank"
            rel="noreferrer"
          >
            <Icon icon="akar-icons:github-fill" className="text-lg" />
          </a>
        </div> */}
			</nav>
		</div>
	);
};

export default Nav;
