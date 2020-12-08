import React, { useCallback, useRef } from 'react';
import {
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationError';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Title,
  Container,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro ao fazer login',
        'Erro ao autenticar usuário, credenciais inválidas'
      );
    }
  }, [Alert, signIn]);

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
            <Title>Faça seu logon</Title>
          </View>

          <Form
            ref={formRef}
            onSubmit={(data) => { handleSubmit(data) }}
            style={{ width: '100%' }}
          >
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              keyboardType="email-address"
              name="email"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              secureTextEntry
              placeholder="Senha"
              name="password"
              icon="lock"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => { formRef.current?.submitForm() }}
            />

            <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>
          </Form>

          <ForgotPassword onPress={() => { }}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>

          <CreateAccount onPress={() => navigation.navigate('SignUp')}>
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountText>Criar uma conta</CreateAccountText>
          </CreateAccount>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignIn;