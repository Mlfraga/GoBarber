import React, { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationError';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Title,
  Container,
  BackToSignIn,
  BackToSignInText
} from './styles'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('users', data);

      navigation.navigate('SignIn');

      Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login na aplicação.')
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro ao fazer cadastro',
        'Erro ao fazer cadastro, tente novamente.'
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container >
          <Image source={logoImg} />

          <View>
            <Title>Crie sua conta</Title>
          </View>

          <Form
            ref={formRef}
            onSubmit={handleSignUp}
            style={{ width: '100%' }}
          >

            <Input
              autoCapitalize="words"
              placeholder="Nome"
              name="name"
              icon="user"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />

            <Input
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              name="email"
              icon="mail"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              name="password"
              icon="lock"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => { formRef.current?.submitForm() }}
              textContentType="newPassword"
            />

            <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>

          </Form>

          <BackToSignIn onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
          </BackToSignIn>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp;