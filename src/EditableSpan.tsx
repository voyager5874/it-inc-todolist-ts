import React, {useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";


type EditableSpanPropsType = {
    itemName: string
    itemNameChangedCallback: (newName: string) => void
}


export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log(`editableSpan was called, text: ${props.itemName}`)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputText, setInputText] = useState('')
    const [error, setError] = useState<boolean>(false)

    const itemDoubleClickHandler = () => {
        setEditMode(true)
        setInputText(props.itemName)
    }

    const inputChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputText(event.currentTarget.value)
    }, [])

    const saveNewName = useCallback(() => {
        const cleanInputText = inputText.trim()
        if (cleanInputText) {
            setEditMode(false)
            props.itemNameChangedCallback(cleanInputText)
            setInputText(props.itemName)
        } else {
            setInputText('')
            setError(true)
        }

    }, [])

    const enterPressHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            saveNewName()
        }
    }, [])

    return (
        editMode ?
            <TextField
                error={Boolean(error)}
                helperText={error}
                onKeyPress={enterPressHandler}
                autoFocus={true}
                onBlur={saveNewName}
                value={inputText}
                onChange={inputChangeHandler}
            /> :
            <span
                onDoubleClick={itemDoubleClickHandler}>{props.itemName}
            </span>

    );
});

