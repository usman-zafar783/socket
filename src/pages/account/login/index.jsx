
import { useState } from 'react';
import loginSchema from '../../../_schemas/loginSchema';
import { AccountContext } from '../../../contexts/accountContext';
import '/public/css/account.css';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const {login} = AccountContext()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async(data) =>{
    try {
      setLoading(true);
      let result = await login(data);
      setLoading(false);
      result ?  navigate('/', { replace: true }) : null;

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <section className="sign-in bg-light">
        <div className="signin-content section">
          <div className="signin-image">
            <figure> <img src="/images/signin-image.jpg" alt="sing up image" /></figure>
            <Link className="signup-image-link" to="/account/auth/register">Create an account</Link>
          </div>

          <div className="signin-form">
            <h2 className="form-title">Sign In</h2>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginSchema}
              onSubmit= {values => {
                handleLogin(values);
              }}
            >

          {({ errors, touched }) => (
            <Form id="login-form">
              <div className="form-group">
                <label htmlFor="your_email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <Field type="email" id="your_email" placeholder="Your email" name="email" />
                {errors.email && touched.email ? ( <div className='error'>{errors.email}</div>) : null}

              </div>
              <div className="form-group">
                <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                <Field type="password" id="your_pass" placeholder="Password" name="password" />
                {errors.password && touched.password ? ( <div className='error'>{errors.password}</div>) : null}

              </div>
              <div className="form-group d-flex align-items-center">
                <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                <Link className="ms-auto" to={'/account/auth/forgot-password'}>Forgot Password</Link>
              </div>
              <div className="form-group form-button">
                <button type="submit" className="form-submit">Login
                  {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                </button>
              </div>
            </Form>
            )}
            </Formik>
          </div>
        </div>
      </section>

    </>
  )
}

export default Login
