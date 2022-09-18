import Center from "../components/Center";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import {useState} from "react";

export default function LoginPage() {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <Center>
            <div className="flex align-items-center justify-content-center w-1/3 bg-red-50">
                <div className="surface-card p-4 shadow-md border-round w-full lg:w-6 flex-1">
                    <div className="flex flex-col mb-5 justify-center items-center">
                        <img src="/vercel.svg" alt="hyper" className="w-40 h-10 mt-2 mb-4" />
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Email</label>
                        <InputText id="email" type="text" className="w-full mb03" />

                        <label htmlFor="password" className="block text-900 font-medium mb-2 mt-4">Password</label>
                        <InputText id="password" type="password" className="w-full" />

                        <div className="flex align-items-center justify-between mb-6 mt-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                                <label htmlFor="rememberme" onClick={e => setChecked(old => !old)} >Remember me</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                        </div>

                        <Button label="Sign In" icon="pi pi-user" className="w-full" />
                    </div>
                </div>
            </div>

        </Center>
    )
}