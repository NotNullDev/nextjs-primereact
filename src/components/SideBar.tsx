import { link } from "fs";
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

    const skipSidebarLinks = [
        "Login"
    ]

    const filteredSidebarLinks = [...links.keys()].filter(key => !skipSidebarLinks.includes(key))

    return (
        <div className={`surface-section flex flex-col ${className} border-r border-slate-700`}>
            {
                [...filteredSidebarLinks].map(key => {
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
    return <div className="">
        <Link href={currentHref} className="flex items-center w-full p-4 pb-5 " key={currentHref}>
            <div className="flex items-center w-full p-4 pb-5 text-center hover:brightness-50 cursor-pointer">
                <i className="pi pi-check mr-3" style={{ 'fontSize': '1em' }}></i>
                <div className="">
                    {key.toUpperCase()}
                </div>
            </div>

        </Link>
    </div >
}
