import { useState, useEffect } from 'react';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import cookieCutter from 'cookie-cutter'
import LoginScreen from '../components/loginScreen';
//import "tailwindcss/tailwind.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLogged(false || cookieCutter.get('logged') === 'true');
      console.log('cookie: ',cookieCutter.get('logged') === 'true');
    }
  }, [])

  function handleLogin(value) {
    setLogged(value);
    cookieCutter.set('logged', value);
  }

  if (!logged) {
    return (
      <LoginScreen handleLogin={handleLogin} />
    )
  }

  return (
    <div >
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="./"><svg width="77.97001953124999px" height="118.830029296875px" xmlns="http://www.w3.org/2000/svg"
                  viewBox="211.014990234375 5.584985351562494 77.97001953124999 138.830029296875"
                  style={{ background: 'transparent', marginBottom: '0%' }} preserveAspectRatio="xMidYMid">
                  <defs>
                    <filter id="editing-hover" x="-100%" y="-100%" width="300%" height="300%">
                      <feFlood floodColor="#052b4a" result="flood"></feFlood>
                      <feComposite operator="in" in2="SourceAlpha" in="flood" result="shadow">
                      </feComposite>
                      <feOffset dx="-4" dy="-4" in="SourceGraphic" result="offset-1"></feOffset>
                      <feOffset dx="4" dy="4" in="shadow" result="offset-2"></feOffset><feMerge>
                        <feMergeNode in="offset-2"></feMergeNode><feMergeNode in="offset-1"></feMergeNode>
                      </feMerge></filter></defs><g filter="url(#editing-hover)">
                    <g transform="translate(228.87999963760376, 100.34500122070312)">
                      <path d="M17.47 0.90L17.47 0.90Q12.54 0.90 8.13-0.22L8.13-0.22L8.13-0.22Q3.71-1.34 0.77-3.33L0.77-3.33L0.77-14.59L13.57-14.59L13.57-13.95L13.57-13.95Q13.57-10.50 16.90-10.50L16.90-10.50L16.90-10.50Q18.62-10.50 19.49-11.42L19.49-11.42L19.49-11.42Q20.35-12.35 20.35-14.34L20.35-14.34L20.35-39.30L14.59-39.30L14.59-49.79L41.47-49.79L41.47-39.30L38.27-39.30L38.27-17.79L38.27-17.79Q38.27-8.38 32.77-3.74L32.77-3.74L32.77-3.74Q27.26 0.90 17.47 0.90L17.47 0.90Z" fill="#ffd5af">
                      </path></g></g>
                  <style jsx>{`text {
                    font-size: 64px;
  font-family: Arial Black;
  dominant-baseline: central;
  text-anchor: middle;
}`}</style></svg></a>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a href="./" className={`${router.pathname === '/' && 'bg-gray-900'} hover:bg-gray-700 hover:text-white text-white px-3 py-2 rounded-md text-sm font-medium`}>Search</a>

                  <a href="./profiles" className={`${router.pathname === '/profiles' && 'bg-gray-900'} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>Profiles</a>

                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  {/* Heroicon name: bell */}
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button onClick={() => setMenu(!menu)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>
                  {/*
            Profile dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
                  <div className={`${!menu && 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu`}>
                    <a href="./" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Search</a>
                    <a href="./profiles" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profiles</a>
                    <button onClick={() => handleLogin(false)} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button --*/}
              <button onClick={() => setMenu(!menu)} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {/*
          Heroicon name: menu

          Menu open: "hidden", Menu closed: "block"
        */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/*-
          Heroicon name: x

          Menu open: "block", Menu closed: "hidden"
        */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*--
  Mobile menu, toggle classes based on menu state.

  Open: "block", closed: "hidden"
          --*/}
        <div className={`xl:hidden lg:hidden md:hidden sm:block ${!menu && 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --*/}
            <a href="./" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Search</a>

            <a href="./profiles" className="text-gray-300 hover:bg-gray-700 hover:text-white block 
            px-3 py-2 rounded-md text-base font-medium">Profiles</a>

          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">Reportei</div>
                <div className="text-sm font-medium leading-none text-gray-400">reportei@example.com</div>
              </div>
              <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                {/* Heroicon name: bell */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow" onClick={() => setMenu(false)}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard {router.pathname !== '/' && '-'} {capitalizeFirstLetter(String(router.pathname).replace('/', ''))}
          </h1>
        </div>
      </header>
      <main onClick={() => setMenu(false)}>

        <Component {...pageProps} />

      </main>
    </div>

  )
}

export default MyApp
