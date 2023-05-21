import React, { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode,
    onClick: Function
}
const Button = (props: ButtonProps) => {
    const { children, onClick } = props

    function clickhandler() {
        onClick()
    }
    
    return (
        <button onClick={clickhandler}>
            {children}
        </button>
    );
};

export default Button;