import "../styles/globals.css";

import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import "primereact/resources/themes/vela-blue/theme.css"

import type { AppProps } from "next/app";
import AppHeader from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const appName = "CapTime";

  // HOOKS START
  const router = useRouter();
  // HOOKS END

  const links: Map<string, string> = new Map<string, string>([
    ["Projects", "/projects"],
    ["Users", "/users"],
    ["Clients", "/clients"],
    ["Tracker", "/tracker"],
    ["Team", "/team"],
    ["Roles", "/roles"],
    ["Tags", "/tags"],
    ["Reports", "/reports"],
    ["Login", "/login"],
  ]);

  console.log(`Page changed! Current page: ${router.asPath}`);

  const currentPageCandidates = [...links.keys()].filter((key) => {
    return router.asPath === links.get(key);
  });

  const currenPage = currentPageCandidates[0] ?? appName;

  const headerHeightPx = "250";
  const sidebarWidth = "120";

  return (
    <div className="flex flex-col min-h-[100vh] w-full flex-1">
      <AppHeader
        pageTitle={appName}
        className={`h-16 justify-center items-center flex   fixed top-0 left-0`}
      />
      <div className={`flex flex-1 mt-14`}>
        <SideBar className={`w-44 fixed h-[100vh] aa`} links={links} currentPage={currenPage}/>
        <div
          className={`flex flex-1 ml-44 min-h-[calc(100vh - 32rem)] overflow-auto m-0 w-[100vw]`}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
