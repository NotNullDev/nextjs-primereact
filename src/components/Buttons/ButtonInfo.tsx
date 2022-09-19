import {Button, ButtonProps} from "primereact/button";
import {ReactElement} from "react";
import ButtonBase from "./ButtonBase";

export default function (props: ButtonProps): ReactElement<Button> {

    const combinedClassName = `p-button-info ${props.className ?? ""}`

    return <ButtonBase {...props} className={combinedClassName}/>
}