import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErros from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  AnimationContainer,
  InputSection,
  AvatarInput,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFromData {
  name: string;
  email: string;
  password: string;
}

type FormHandlesProps = FormHandles;

const Profile: React.FC = () => {
  const formRef = useRef<FormHandlesProps>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth()

  const handleSubmit = useCallback(
    async (data: ProfileFromData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Seu cadastro foi criado',
          description: 'Você já pode fazer seu logon',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao cadastrar, tente novamente mais tarde',
        });
      }
    },
    [addToast, history],
  );

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0])
      const data = new FormData();

      data.append('avatar', e.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data)

        addToast({
          type: 'success',
          title: 'Avatar atualizado'
        })
      })
    }
  }, [])
  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={{
            name: user.name,
            email: user.email
          }}>
            <AvatarInput>
              <img src={user.avatar_url} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />
                <input type="file" id="avatar" onChange={handleAvatarChange}/>
              </label>
            </AvatarInput>

            <h1>Meu Perfil</h1>

            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
            />

            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />

          <InputSection>
            <Input
              name="old_password"
              icon={FiLock}
              placeholder="Senha atual"
              type="passowrd"
            />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Nova Senha"
              type="passowrd"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              placeholder="Confirmar Senha"
              type="passowrd"
            />
          </InputSection>

            <Button>Confirmar alterações</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
