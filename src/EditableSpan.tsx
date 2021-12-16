import React, {useState} from 'react';

type EditableSpanPropsType = {
    itemName: string
    itemNameChangedCallback: (newName: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputText, setInputText] = useState('')

    const itemDoubleClickHandler = () => {
        setEditMode(true)
        setInputText(props.itemName)
    }

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.currentTarget.value)
    }
    const inputBlurHandler = () => {
        setEditMode(false)
        props.itemNameChangedCallback(inputText)
        setInputText(props.itemName)
    }

    const enterKeypressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditMode(false)
            props.itemNameChangedCallback(inputText)
            setInputText(props.itemName)
        }
    }

    return (
        editMode ?
            <input
                onKeyPress={enterKeypressHandler}
                autoFocus={true}
                onBlur={inputBlurHandler}
                value={inputText}
                onChange={inputChangeHandler}
            /> :
            <span
                onDoubleClick={itemDoubleClickHandler}>{props.itemName}
            </span>

    );
};

