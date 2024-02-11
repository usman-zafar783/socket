import { useState } from 'react';
import registerSchema from '../../../_schemas/registerSchema';
import { AccountContext } from '../../../contexts/accountContext';
import '/public/css/account.css';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Register() {

    const {register} = AccountContext()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async(data) =>{
        try {
          delete data.confirmPassword;
          setLoading(true);
          let result = await register(data);
          setLoading(false);
          result ?  navigate('/', { replace: true }) : null;
         
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }

  return (
    <>      
    <section className="signup">
        <div className="section">
            <div className="signup-content">
                <div className="signup-form">
                    <h2 className="form-title">Sign up</h2>


                <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={registerSchema}
                onSubmit= {values => {
                    handleRegister(values);
                }}
                >
                {({ errors, touched }) => (

                    <Form className="register-form" id="register-form">
                        <div className="form-group">
                            <Field type="text" placeholder="Enter username" name="username"/>
                            {errors.username && touched.username ? ( <div className='error'>{errors.username}</div>) : null}
                        </div>

                        <div className="form-group">
                            <Field type="email" id="email" placeholder="Your Email" name="email"/>
                            {errors.email && touched.email ? ( <div className='error'>{errors.email}</div>) : null}
                        </div>
                        
                        <div className="form-group">
                            <Field type="password" id="pass" placeholder="Password" name="password"/>
                            {errors.password && touched.password ? ( <div className='error'>{errors.password}</div>) : null}
                        </div>
                        <div className="form-group">
                            <Field type="password" id="re_pass" placeholder="Repeat your password" name="confirmPassword"/>
                            {errors.confirmPassword && touched.confirmPassword ? ( <div className='error'>{errors.confirmPassword}</div>) : null}
                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="agree-term" className="agree-term" />
                            <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" className="term-service">Terms of service</a></label>
                        </div>
                        <div className="form-group form-button">
                            <button type="submit" className="form-submit">Register
                             {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            </button>
                        </div>
                    </Form>
                    
                    )}
                </Formik>
                </div>
                <div className="signup-image">
                    <figure><img src="/images/signup-image.jpg" alt="sing up image"/></figure>
                    <Link className="signup-image-link" to="/account/auth/login">I am already member</Link>
                </div>
            </div>
        </div>
    </section>

      
    </>
  )
}

export default Register
