import '../styles/globals.css'

import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import type { AppProps } from 'next/app'
import AppHeader from '../components/Header'
import SideBar from '../components/SideBar';
import { useRouter } from 'next/router';
import { useState } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
  const appName = 'AA';

  // HOOKS START
  const router = useRouter()
  // HOOKS END

  const links: Map<string, string> = new Map<string, string>([
    ["Projects", "/projects"],
    ["Team", "/team"],
    ["Clients", "/clients"],
    ["Tags", "/tags"],
    ["Tracker", "/tracker"],
    ["Roles", "/roles"],
    ["Reports", "/reports"],
    ["Login", "/login"]
  ])

  console.log(`Page changed! Current page: ${router.asPath}`)

  const [tempTitle, setTempTitle] = useState('AA');

  const currentPageCandidates = [...links.keys()].filter(key => {
    return router.asPath === links.get(key)
  })

  const currenPage = currentPageCandidates[0] ?? appName;

  return (
    <div className='flex flex-col min-h-[100vh] '>
      <AppHeader pageTitle={tempTitle} />
      <div className='flex flex-1'>
        <SideBar />
        <div className='flex-1 p-4'>
          <Component {...pageProps} />
        </div></div>
    </div>
  )
}

export default MyApp
