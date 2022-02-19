import React, {useCallback, useState} from 'react';
import TextField from "@material-ui/core/TextField";


type EditableSpanPropsType = {
    disabled?: boolean
    itemName: string
    itemNameChangedCallback: (newName: string) => void
}


export const EditableSpan = React.memo(({disabled = false, ...props}: EditableSpanPropsType) => {
    console.log(`editableSpan was called, text: ${props.itemName}`)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputText, setInputText] = useState('')
    const [error, setError] = useState<boolean>(false)

    const itemDoubleClickHandler = () => {
        if(disabled) return
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

    }, [inputText])

    const enterPressHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            saveNewName()
        }
    }, [saveNewName])

    return (
        editMode ?
            <TextField
                // disabled={disabled}
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

