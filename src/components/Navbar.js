import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

import Container from './Container';

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutUser());
    navigate('/');
  };

  return (
    <Container semantic='header'>
      <nav className='mb-8 flex flex-wrap justify-between p-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            <Link to='/'>blog: any</Link>
          </h1>
          <p className='text-lg'>my pleasure, let's rock</p>
        </div>
        <ul className='flex items-center gap-4'>
          {user ? (
            <>
              <li>
                <Link to='/new-blog'>new blog</Link>
              </li>
              <li>
                <Link to={`/profile/${user.username}`}>
                  profile ({user.username})
                </Link>
              </li>
              <li>
                <button
                  className='hover:underline'
                  type='submit'
                  onClick={handleSignOut}
                >
                  log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/signin'>sign in</Link>
              </li>
              <li>
                <Link to='/signup'>sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Container>
  );
};

export default Navbar;
