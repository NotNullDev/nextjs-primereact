import {Button, ButtonProps} from "primereact/button";
import {ReactElement} from "react";

export default function (props: ButtonProps): ReactElement<Button> {

    const combinedClassName = `p-button p-button-text p-button-raised ${props.className ?? ""}`

    return <Button {...props} className={combinedClassName}/>
}