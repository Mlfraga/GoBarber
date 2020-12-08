import React, { useEffect, useImperativeHandle, useRef, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { TextInput, Container, Icon } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}


const Input: React.ForwardRefRenderFunction<InputRef, IInputProps> = (
  { name, icon, ...rest },
  ref
) => {
  const InputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const InputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFilled, setIsFilled] = useState<boolean>(false)

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: InputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        InputValueRef.current.value = value;
        InputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        InputValueRef.current.value = '';
        InputElementRef.current.clear();
      }
    })
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [setIsFocused])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!InputValueRef.current.value);
  }, [setIsFilled])

  useImperativeHandle(ref, () => ({
    focus() {
      InputElementRef.current.focus();
    }
  }));

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={InputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => {
          InputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input);