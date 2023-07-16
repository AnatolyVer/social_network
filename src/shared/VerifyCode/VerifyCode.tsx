import React, {useRef, useEffect, SetStateAction, Dispatch} from 'react';
import classes from './styles.module.scss'
import {useSelector} from "react-redux";
import { State } from '../../redux/store/index';

const KEYBOARDS = {
    backspace: 8,
    arrowLeft: 37,
    arrowRight: 39,
};

interface CodeInputProps{
    code:string,
    setCode: Dispatch<SetStateAction<string>>
}

const CodeInputForm = ({code, setCode}:CodeInputProps) => {
    const inputsRef = useRef<HTMLInputElement[]>([]);

    const theme:string = useSelector((state:State) => state.theme)

    useEffect(() => {
        if (inputsRef.current.length > 0) {
            inputsRef.current[0].focus();
        }
    }, []);

    const changeCode = () => {
        const codeArray = inputsRef.current.map((input) => input.value).filter(Boolean);
        const codeString = codeArray.join('');
        setCode(codeString);
    }

    const handleInput = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const nextIndex = index + 1;
        const nextInput = inputsRef.current[nextIndex];
        if (nextInput && value) {
            nextInput.focus();
            if (nextInput.value) {
                nextInput.select();
            }
        }
        changeCode()
    };

    const handlePaste = (ev: ClipboardEvent) => {
        ev.preventDefault();
        const paste = ev.clipboardData!.getData('text');
        const pasteArray = paste.split('');
        inputsRef.current.forEach((input, i) => {
            input.value = pasteArray[i] || '';
        });
        changeCode()
    };

    const handleBackspace = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        //@ts-ignore
        const { value } = event.target;

        if (value) {
            //@ts-ignore
            event.target.value = '';
            changeCode()
            return;
        }

        const previousIndex = index - 1;
        const previousInput = inputsRef.current[previousIndex];

        if (previousInput) {
            previousInput.focus();
        }

    };

    const handleArrowLeft = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        const previousIndex = index - 1;
        const previousInput = inputsRef.current[previousIndex];

        if (previousInput) {
            previousInput.focus();
        }
    };

    const handleArrowRight = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        const nextIndex = index + 1;
        const nextInput = inputsRef.current[nextIndex];

        if (nextInput) {
            nextInput.focus();
        }
    };

    return (
        <form className={`${theme}Post`}>
            <div className={`${classes.CodeInput}`}>
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        type="tel"
                        maxLength={1}
                        className={`${theme}Body ${theme}Text ${classes.Input}`}
                        ref={(input) => {
                            if (input) {
                                inputsRef.current[index] = input;
                                if (index === 0) {
                                    inputsRef.current[index].addEventListener('paste', handlePaste)
                                }
                            }
                        }}
                        onChange={handleInput(index)}
                        onKeyDown={(event) => {
                            switch (event.keyCode) {
                                case KEYBOARDS.backspace:
                                    handleBackspace(index)(event);
                                    break;
                                case KEYBOARDS.arrowLeft:
                                    handleArrowLeft(index)(event);
                                    break;
                                case KEYBOARDS.arrowRight:
                                    handleArrowRight(index)(event);
                                    break;
                                default:
                            }
                        }}
                    />
                ))}
            </div>
        </form>
    );
};

export default CodeInputForm;
