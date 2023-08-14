import { Helmet } from 'react-helmet-async';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { signInUser } from '../reducers/userReducer';
import { useNavigate, Link } from 'react-router-dom';

import Container from '../components/Container';

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useField('text');
  const password = useField('password');

  const handleSignIn = async (event) => {
    event.preventDefault();

    const credentials = {
      username: username.input.value,
      password: password.input.value,
    };

    dispatch(signInUser(credentials))
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Helmet>
        <title>sign in | blog: any</title>
      </Helmet>
      <Container semantic='main'>
        <div className='flex flex-col items-center p-8'>
          <h1 className='mb-8 text-xl'>sign in to your account</h1>
          <form onSubmit={handleSignIn}>
            <div className='mb-4'>
              <label className='block text-center'>username</label>
              <input
                {...username.input}
                className='mt-2 w-96 rounded-md border-2 border-gray-300 px-3 py-2 text-center placeholder-gray-400 focus:outline-none'
                placeholder='jack'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-center'>password</label>
              <input
                {...password.input}
                className='mt-2 w-96 rounded-md border-2 border-gray-300 px-3 py-2 text-center placeholder-gray-400 focus:outline-none'
                placeholder='****'
              />
            </div>
            <div className='mb-4'>
              <p className='text-center'>
                no account?{' '}
                <Link to='/signup' className='underline'>
                  sign up
                </Link>
              </p>
            </div>
            <button
              className='w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 hover:bg-black hover:text-white'
              type='submit'
            >
              sign in
            </button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignInForm;