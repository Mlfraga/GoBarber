import React from 'react'
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Gobarber" />

      <form >
        <h1>Faça seu logon</h1>

        <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
        <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha.</a>
      </form>

      <a href="create-account"> <FiLogIn /> Criar conta.</a>
    </Content>
    <Background />
  </ Container>
);

export default SignIn
