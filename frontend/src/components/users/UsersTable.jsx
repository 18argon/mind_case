import UsersTableRow from './UsersTableRow';

export default function UsersTable({ users }) {

  return (
    <table>
      <thead>
      <tr>
        <th>Nome completo</th>
        <th>E-mail</th>
        <th>CPF</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user) => {
        console.log(user);
        return <UsersTableRow key={user.id} id={user.id} {...user} />;
      })}
      </tbody>
    </table>
  )
}
;
