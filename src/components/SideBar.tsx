import Link from "next/link"
import { ReactElement } from "react";

export default function SideBar({ className }: { className?: string }) {
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

    return (
        <div className={`surface-section flex flex-col ${className} border-r border-slate-700`}>
            {
                [...links.keys()].map(key => {
                    const currentHref = links.get(key) ?? "/";
                    return (
                        SingleSideBarLink(currentHref, key)
                    )
                })
            }
        </div>
    )
}

function SingleSideBarLink(currentHref: string, key: string): ReactElement {
    return <div className="flex items-center w-full p-4 pb-5 text-center hover:brightness-50 cursor-pointer" key={currentHref}>
        <i className="pi pi-check mr-3" style={{ 'fontSize': '1em' }}></i>
        <Link href={currentHref}>
            <div className="">
                {key.toUpperCase()}
            </div>
        </Link>
    </div>;
}
