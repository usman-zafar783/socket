import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { AccountContext } from '../../../contexts/accountContext';
 

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const {forgotPassword} = AccountContext()

    const schema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address').required('Email is a Required Field'),
    });

    const handleSubmit = async(values) =>{
        try {
            setLoading(true);
            let result = await forgotPassword(values);
            setLoading(false);
            console.log(result);

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
                    <figure><img src="/images/signin-image.jpg" alt="sing up image"/></figure>
                </div>

                <div className="signin-form">
                    <h2 className="form-title">Forgot Password</h2>

                    <Formik initialValues={{email:''}} validationSchema={schema} 
                    onSubmit= {values =>{
                        handleSubmit(values);
                    }}>
                    {({ errors, touched }) => (
                        <Form className="register-form" id="login-form">
                            <div className="form-group">
                                <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <Field type="email" id="your_name" placeholder="Your Email address"
                                autoComplete="off" name="email" />
                                {errors.email && touched.email ? ( <div className='error'>{errors.email}</div>) : null}
                            </div>
                        
                            <div className="form-group form-button">
                                <button type="submit" className="form-submit">Reset Password 
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
  
  export default ForgotPassword;
  