import ButtonInfo from "./Buttons/ButtonInfo";
import {logout} from "../lib/currentUserSerivce";

export default function AppHeader({
                                      className,
                                      pageTitle,
                                  }: {
    className?: string;
    pageTitle: string;
}) {
    return (
        <div className={`flex justify-between p-4 px-6 shadow-md w-full aa ${className}`}>
            <div className="text-3xl font-semibold font-serif">{pageTitle}</div>
            <div className="flex justify-center items-center">
                <div className="text-xl mr-6">User32</div>
                <ButtonInfo label="Sign Out" icon="pi pi-user" className="w-full" onClick={() => {
                    logout();
                }}/>
            </div>
        </div>
    );
}
