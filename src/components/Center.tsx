import {ReactNode} from "react";

export default function Center({
                                   children,
                                   className
                               }: { children: ReactNode | ReactNode[] | string, className?: string }) {
    return (
        <div className={`flex text-center flex-1 flex-col justify-center items-center w-full h-full ${className}`}>
            {children}
        </div>
    )
}