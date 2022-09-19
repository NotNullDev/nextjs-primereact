import Link from "next/link";
import {ReactElement} from "react";

export default function SideBar({
                                    className,
                                    links,
                                    currentPage
                                }: { className?: string, links: Map<string, string>, currentPage: string }) {
    const skipSidebarLinks = ["Login"];

    const filteredSidebarLinks = [...links.keys()].filter(
        (key) => !skipSidebarLinks.includes(key)
    );

    console.log("Active page ", currentPage)

    return (
        <div
            className={`first:pt-10 flex flex-col pb-6 overflow-auto ${className} `}
        >
            {[...filteredSidebarLinks].map((key) => {
                const currentHref = links.get(key) ?? "/";
                return (
                    <SingleSideBarLink
                        currentHref={currentHref}
                        key={key}
                        displayName={key}
                        active={currentPage === key}
                    />
                );
            })}
        </div>
    );
}

function SingleSideBarLink({
                               currentHref,
                               displayName,
                               active
                           }: {
    currentHref: string;
    displayName: string;
    active: boolean
}): ReactElement {
    const activeClass = active ? "brightness-100" : "brightness-50";

    return (
        <div className={`rounded-xl ct-link-hover transition-all duration-500 hover:brightness-100 ${activeClass}`}>
            <Link
                href={currentHref}
                className="flex items-center w-full p-4 pb-5"
                key={currentHref}
            >
                <div className="flex items-center w-full p-4 pb-5 text-center cursor-pointer">
                    {/*<i className="pi pi-check mr-3" style={{ fontSize: "1em" }}></i>*/}
                    <div className="text-center w-full">{displayName.toUpperCase()}</div>
                </div>
            </Link>
        </div>
    );
}
