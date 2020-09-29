import React, { useCallback, useRef } from 'react'
import { FiLock, FiMail, FiUser, FiArrowLeft } from 'react-icons/fi'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import getValidationsErrors from '../../utils/getValidationError';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../context/toast';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

      history.push('/');

      addToast({
        title: 'Cadastro realizado',
        type: 'success',
        description: 'Você já pode fazer seu logon no GoBarber.'
      })


    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        title: 'Erro no cadastro',
        type: 'error',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.'
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" type="text" placeholder="Name" />
            <Input icon={FiMail} name="email" type="text" placeholder="E-mail" />
            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form >

          <Link to="/"> <FiArrowLeft /> Voltar para logon.</Link>
        </AnimationContainer>
      </Content>
    </ Container>
  )
};

export default SignUp
