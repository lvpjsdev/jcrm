import { Link } from 'react-router';
import { getViewKeyRoute } from '../../app/routes';
import { trpc } from '../../app/trpc';

export const KeysList = () => {
  const { data } = trpc.getKeysList.useQuery();

  return (
    <>
      <h1>Keys</h1>
      <ul>
        {data?.map((key) => (
          <li key={key.id}>
            <Link to={getViewKeyRoute({ keyId: key.id })}>{key.name || key.id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
