import { link } from "fs";
import Link from "next/link";
import { ReactElement } from "react";

export default function SideBar({ className, links }: { className?: string, links: Map<string, string> }) {
  const skipSidebarLinks = ["Login"];

  const filteredSidebarLinks = [...links.keys()].filter(
    (key) => !skipSidebarLinks.includes(key)
  );

  return (
    <div
      className={`flex flex-col border-r border-slate-700 p-4 pb-6 overflow-auto ${className}`}
    >
      {[...filteredSidebarLinks].map((key) => {
        const currentHref = links.get(key) ?? "/";
        return (
          <SingleSideBarLink
            currentHref={currentHref}
            key={key}
            displayName={key}
          />
        );
      })}
    </div>
  );
}

function SingleSideBarLink({
  currentHref,
  displayName,
}: {
  currentHref: string;
  displayName: string;
}): ReactElement {
  return (
    <div className="">
      <Link
        href={currentHref}
        className="flex items-center w-full p-4 pb-5 "
        key={currentHref}
      >
        <div className="flex items-center w-full p-4 pb-5 text-center hover:brightness-50 cursor-pointer">
          <i className="pi pi-check mr-3" style={{ fontSize: "1em" }}></i>
          <div className="">{displayName.toUpperCase()}</div>
        </div>
      </Link>
    </div>
  );
}
