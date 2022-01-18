import React, {useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import styled from "styled-components";

type addItemFormPropsType = {
    addItemCallback: (itemName: string) => void
}
const AddItemFormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`


export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    console.log("AddItemForm called")
    const [inputText, setInputText] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (inputError) {
            setInputError(false)
        }
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
        <AddItemFormWrapper>
            <TextField
                label={inputError ? 'give it a name' : 'Title'}
                size={"small"}
                variant={"outlined"}
                value={inputText}
                error={inputError}
                onChange={inputChangeHandler}
                onKeyPress={keyPressWithinInputHandler}/>
            <IconButton onClick={addItem}><AddBox/></IconButton>
        </AddItemFormWrapper>
    );
});

