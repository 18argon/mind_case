import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  username: yup.string().required('Este campo é obrigatório'),
  password: yup.string(),
});

export default function LogInForm({ onSubmit }) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <h1 className="has-text-centered is-size-3">Log In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <p>{errors.username?.message}</p>
          <label className="label" htmlFor="username">CPF ou E-mail: </label>
          <input type="text" className="input" id="username" name="username" ref={register}/>
        </div>

        <div className="field">
          <p>{errors.password?.message}</p>
          <label className="label" htmlFor="password">Senha: </label>
          <input type="text" className="input" id="password" name="password" ref={register}/>
        </div>

        <div className="field has-text-centered">
          <button className="button is-light is-fullwidth">Entrar</button>
          <p>ou</p>
          <Link to='/signup'>Criar uma conta</Link>
        </div>
      </form>
    </>
  );
}
