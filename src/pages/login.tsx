import Center from "../components/Center";
import {InputText} from "primereact/inputtext";
import {Checkbox} from "primereact/checkbox";
import {Password} from 'primereact/password';
import {useState} from "react";
import ButtonInfo from "../components/Buttons/ButtonInfo";
import {login} from "../lib/currentUserSerivce";
import {useRouter} from "next/router";

export default function LoginPage() {
    const [password, setPassword] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(false);
    const router = useRouter();

    return (
        <Center>
            <div className="flex align-items-center justify-content-center w-1/4 bg-red-50">
                <div className="surface-card p-4 shadow-md border-round w-full lg:w-6 flex-1">
                    <div className="flex flex-col mb-5 justify-center items-center">
                        <img src="/vercel.svg" alt="hyper" className="w-40 h-10 mt-2 mb-4"/>
                        <div className="text-900 text-3xl font-medium mb-3">Welcome Back <br/> (CLICK SIGN IN, dev mode)
                        </div>
                    </div>
                    <div>
                        <div className="p-inputgroup mb-4">
                            <InputText placeholder="Email" id="email"/>
                            <span className="p-inputgroup-addon">@aaa.com</span>
                        </div>

                        <Password value={password} onChange={(e) => setPassword(e.target.value)} toggleMask
                                  feedback={false} width="100%" placeholder="Password"
                                  className="w-full" inputClassName="flex-1"
                        />

                        {/*<InputText id="password" type="password" className="w-full" />*/}

                        <div className="flex align-items-center justify-between mb-6 mt-6">
                            <div className="flex align-items-center">
                                <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked}
                                          className="mr-2"/>
                                <label htmlFor="rememberme" onClick={e => setChecked(old => !old)}>Remember me</label>
                            </div>
                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot
                                your password?</a>
                        </div>

                        <ButtonInfo label="Sign In" icon="pi pi-user" className="w-full"
                                    onClick={() => {
                                        login();
                                        router.back();
                                    }}
                        />
                    </div>
                </div>
            </div>

        </Center>
    )
}