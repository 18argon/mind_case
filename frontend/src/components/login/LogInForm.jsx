import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string(),
});

export default function LogInForm({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>{errors.username?.message}</p>
        <label htmlFor="username">CPF ou E-mail: </label>
        <input type="text" id="username" name="username" ref={register}/>
      </div>

      <div>
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Senha: </label>
        <input type="text" id="password" name="password" ref={register}/>
      </div>

      <div>
        <input type="submit"/>
      </div>
    </form>
  );
}