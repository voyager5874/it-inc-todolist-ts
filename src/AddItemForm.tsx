import React, {useState} from 'react';
import s from "./Todolist.module.css";

type addItemFormPropsType = {
    addItemCallback: (itemName: string) => void
}

export const AddItemForm = (props: addItemFormPropsType) => {
    const[inputText, setInputText]=useState<string>('')
    const[inputError, setInputError] = useState<boolean>(false)

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputError(false)
        setInputText(event.currentTarget.value)
    }
    const addItem = () => {
        if (inputText.trim()) {
            props.addItemCallback(inputText.trim())
        } else {
            setInputError(true)
        }
        setInputText('')
    }

    const keyPressWithinInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }
    }



    return (
        <div>
            <input value={inputText}
                   className={`${inputError ? "error" : ""} ${s.customInput}`}
                   onChange={inputChangeHandler}
                   onKeyPress={keyPressWithinInputHandler}/>
            <button onClick={addItem}>+</button>
            {inputError && <div className={"error-message"}>Name your task</div>}
        </div>
    );
};

