import { useForm } from 'react-hook-form';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpForm({ onSubmit }) {
  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <>
      <h1 className="has-text-centered is-size-3">Criar Usuário</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <p>{errors.email?.message}</p>
          <label className="label" htmlFor="email">E-mail: </label>
          <input type="text" className="input" id="email" name="email" ref={register}/>
        </div>

        <div className="field">
          <p>{errors.cpf?.message}</p>
          <label className="label" htmlFor="cpf">CPF: </label>
          <input type="text" className="input" id="cpf" name="cpf" ref={register}/>
        </div>

        <div className="field">
          <p>{errors.fullName?.message}</p>
          <label className="label" htmlFor="fullName">Nome completo: </label>
          <input type="text" className="input" id="fullName" name="fullName" ref={register}/>
        </div>

        <div className="field">
          <p>{errors.password?.message}</p>
          <label className="label" htmlFor="password">Senha: </label>
          <input type="password" className="input" id="password" name="password" ref={register}/>
        </div>

        <div className="field">
          <label className="label" htmlFor="avatar">Imagem de Perfil</label>
          <div className="file has-name is-fullwidth">
            <label className="file-label">
              <input type="file" className="file-input" id="avatar" name="avatar" ref={register}/>

              <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"/>
              </span>
              <span className="file-label">Escolha uma imagem...</span>
            </span>
              <span className="file-name">{watch("avatar")?.length && watch('avatar')[0].name}</span>
            </label>
          </div>
        </div>


        <div className="field has-text-centered">
          <button className="button is-light is-fullwidth">Criar</button>
          <p>ou</p>
          <Link to='/login'>Log In</Link>
        </div>
      </form>
    </>
  );
};
