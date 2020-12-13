import { useForm } from 'react-hook-form';
import React from 'react';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email(),
  cpf: yup.string(),
  fullName: yup.string(),
});


export default function EditUserForm({onSubmit, email, cpf, fullName, imagePath}) {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      email,
      cpf,
      fullName,
    },
  });

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
        <label htmlFor="newAvatar">Imagem de Perfil: </label>
        <input type="file" id="newAvatar" name="newAvatar" ref={register}/>
      </div>

      <div className="field">
        <label className="label">Imagem de Perfil Atual: </label>
        <figure className="">
          <img style={{ width: "128px" }} src={`${process.env.REACT_APP_BACKEND_URL}/${imagePath}`}
               alt="Imagem de perfil atual"/>
        </figure>
      </div>

      <div>
        <button>Salvar</button>
      </div>
    </form>
  );
};
