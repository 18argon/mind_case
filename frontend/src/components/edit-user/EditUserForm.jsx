import { useForm } from 'react-hook-form';
import React from 'react';

export default function EditUserForm({ onSubmit, email, cpf, fullName, imagePath }) {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      email,
      cpf,
      fullName,
    },
  });

  return (
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
        <label className="label">Imagem de Perfil</label>
        <div className="file has-name is-fullwidth">
          <label className="file-label">
            <input type="file" className="file-input" id="newAvatar" name="newAvatar" ref={register}/>

            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"/>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
            <span className="file-name">
              {watch("newAvatar")?.length && watch('newAvatar')[0].name}
            </span>
          </label>
        </div>
      </div>

      <div className="field">
        <label className="label">Imagem de Perfil Atual: </label>
        <figure className="">
          <img style={{ width: "128px" }} src={`${process.env.REACT_APP_BACKEND_URL}/${imagePath}`}
               alt="Imagem de perfil atual"/>
        </figure>
      </div>

      <div className="field">
        <button className="button is-success field-right">Salvar</button>
      </div>
    </form>
  );
};
