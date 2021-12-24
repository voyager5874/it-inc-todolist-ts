import React, {useState} from 'react';
import s from "./AddItemForm.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type addItemFormPropsType = {
    addItemCallback: (itemName: string) => void
}

export const AddItemForm = (props: addItemFormPropsType) => {
    const [inputText, setInputText] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

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
            <TextField
                label={"Title"}
                size={"small"}
                variant={"outlined"}
                value={inputText}
                error={inputError}
                helperText={inputError ? 'give it a name' : ''}
                onChange={inputChangeHandler}
                onKeyPress={keyPressWithinInputHandler}/>
            <IconButton onClick={addItem}><AddBox/></IconButton>
            {/*{inputError && <div className={"error-message"}>give it a name</div>}*/}
        </div>
    );
};

