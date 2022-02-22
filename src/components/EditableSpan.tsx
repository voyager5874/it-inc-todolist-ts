import React, { memo, useCallback, useState } from 'react';

import TextField from '@material-ui/core/TextField';

import { ComponentReturnType } from '../types/ComponentReturnType';

type EditableSpanPropsType = {
  disabled?: boolean;
  itemName: string;
  itemNameChangedCallback: (newName: string) => void;
};

export const EditableSpan = memo(
  ({ disabled = false, ...props }: EditableSpanPropsType): ComponentReturnType => {
    // console.log(`editableSpan was called, text: ${props.itemName}`);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [textFieldContent, setTextFieldContent] = useState('');
    const [error, setError] = useState<boolean>(false);

    const handleDoubleClick = (): void => {
      if (disabled) return;
      setEditMode(true);
      setTextFieldContent(props.itemName);
    };

    const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setError(false);
      setTextFieldContent(event.currentTarget.value);
    };

    const saveNewName = (): void => {
      const cleanInputText = textFieldContent.trim();
      if (cleanInputText) {
        setEditMode(false);
        props.itemNameChangedCallback(cleanInputText);
        setTextFieldContent(props.itemName);
      } else {
        setTextFieldContent('');
        setError(true);
      }
    };

    const onEnterKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          saveNewName();
        }
      },
      [saveNewName],
    );

    return editMode ? (
      <TextField
        error={Boolean(error)}
        helperText={error}
        onKeyPress={onEnterKeyPress}
        autoFocus
        onBlur={saveNewName}
        value={textFieldContent}
        onChange={onTextFieldChange}
      />
    ) : (
      <span onDoubleClick={handleDoubleClick}>{props.itemName}</span>
    );
  },
);
