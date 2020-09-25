import React, { useRef, useCallback } from 'react'
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup';

import getValidationsErrors from '../../utils/getValidationError';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (err) {
      const errors = getValidationsErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />

        <Form ref={formRef} onSubmit={handleSubmit} >
          <h1>Faça seu logon</h1>

          <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha.</a>
        </Form>

        <a href="create-account"> <FiLogIn /> Criar conta.</a>
      </Content>
      <Background />
    </ Container>
  )
};

export default SignIn