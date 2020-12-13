import { useForm } from 'react-hook-form';
import React from 'react';

export default function SignUpForm({ onSubmit, email, cpf, fullName, imagePath }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <p>{errors.email?.message}</p>
        <label htmlFor="email">E-mail: </label>
        <input type="text" id="email" name="email" ref={register}/>
      </div>

      <div>
        <p>{errors.cpf?.message}</p>
        <label htmlFor="cpf">CPF: </label>
        <input type="text" id="cpf" name="cpf" ref={register}/>
      </div>

      <div>
        <p>{errors.fullName?.message}</p>
        <label htmlFor="fullName">Nome completo: </label>
        <input type="text" id="fullName" name="fullName" ref={register}/>
      </div>

      <div>
        <p>{errors.password?.message}</p>
        <label htmlFor="password">Senha: </label>
        <input type="password" id="password" name="password" ref={register}/>
      </div>

      <div>
        <label htmlFor="newAvatar">Imagem de Perfil: </label>
        <input type="file" id="newAvatar" name="newAvatar" ref={register}/>
      </div>

      <div>
        <button>Criar</button>
      </div>
    </form>
  );
};
