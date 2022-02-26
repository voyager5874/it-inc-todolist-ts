import React, { memo, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import styled from 'styled-components';

import { ComponentReturnType } from 'types/ComponentReturnType';
import { getCleanString } from 'utils';

type addItemFormPropsType = {
  addItemCallback: (itemName: string) => void;
  disabled?: boolean;
};
const AddItemFormWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

export const AddItemForm = memo(
  ({ disabled = false, ...props }: addItemFormPropsType): ComponentReturnType => {
    // console.log(
    //   `AddItemForm with "${props.addItemCallback.toString()}" callback was called`,
    // );
    const [textFieldContent, setTextFieldContent] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      if (error) {
        setError(false);
      }
      setTextFieldContent(event.currentTarget.value);
    };

    const addItem = (): void => {
      const title = getCleanString(textFieldContent);
      if (title) {
        props.addItemCallback(title);
      } else {
        setError(true);
      }
      setTextFieldContent('');
    };

    const onEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Enter') {
        addItem();
      }
    };

    return (
      <AddItemFormWrapper>
        <TextField
          disabled={disabled}
          label={error ? 'give it a name' : 'Title'}
          size="small"
          variant="outlined"
          value={textFieldContent}
          error={error}
          onChange={onTextFieldChange}
          onKeyPress={onEnterKeyPress}
        />
        <IconButton disabled={disabled} onClick={addItem}>
          <AddBox />
        </IconButton>
      </AddItemFormWrapper>
    );
  },
);
