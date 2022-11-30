import Nav from './Nav';
import Link from 'next/link';

export default function Layout({children}){
    return (
      <div className="mx-6 md:max-w-2xl md:mx-auto font-poppins">
        <Nav />
        <main>{children}</main>
        <div className="flex fixed bottom-10">
          <Link href="https://myportfolio-blue-psi.vercel.app/">
            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-full text-sm">
              Meet the Developer
            </button>
          </Link>
        </div>
      </div>
    );
}