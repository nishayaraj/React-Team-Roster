import { Button } from 'react-bootstrap';
// import { signOut } from '../utils/auth';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      <p>Welcome to the 74th Hunger Games!</p>
      {/* <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button> */}
      <Link href="/players" passHref>
        <Button
          variant="danger"
          type="button"
          size="lg"
          className="copy-btn"
        >Click to view the Tributes
        </Button>
      </Link>

      <Link href="/teams" passHref>
        <Button
          variant="danger"
          type="button"
          size="lg"
          className="copy-btn"
        >Click to view the Districts
        </Button>
      </Link>
    </div>

  );
}

export default Home;
