'use client';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiBugFill } from 'react-icons/ri';

const Navbar = () => {
  const currentPath = usePathname();
  const navList = [
    { name: 'Dashboard', link: '/' },
    { name: 'Issues', link: '/issues' },
  ];

  return (
    <nav className='flex border-b-2 py-5 items-center gap-10 px-6 mb-6'>
      <Link
        href='/'
        className='text-2xl'
      >
        <RiBugFill />
      </Link>
      <ul className='flex gap-6'>
        {navList.map((list) => (
          <li key={list.name}>
            <Link
              href={list.link}
              className={classNames('hover:text-black', 'transition-colors', {
                'text-black font-semibold': currentPath === list.link,
                'text-slate-500': currentPath !== list.link,
              })}
            >
              {list.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
