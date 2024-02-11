import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AccountContext } from '../../../contexts/accountContext';
 

function ResetPassword() {
    const [loading, setLoading] = useState(false);
    const {resetPassword} = AccountContext();
    const {id, token } = useParams();
    const navigate = useNavigate();

    const schema = Yup.object().shape({
      password: Yup.string().min(8, 'Passwored must contains 8 letters').max(50, 'Too Long!').required('Password is a Required Field'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const handleSubmit = async(values) =>{
      let data = { password:values.password, _id: id, token };

      try {
          setLoading(true);
          let result = await resetPassword(data);
          setLoading(false);
          console.log(result);
          navigate('/account/auth/login')

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
                <h2 className="form-title">Reset Password</h2>

                <Formik initialValues={{password:'', confirmPassword:''}} validationSchema={schema} 
                    onSubmit= {values =>{
                        handleSubmit(values);
                    }}>
                    {({ errors, touched }) => (

                    <Form className="register-form" id="register-form">

                        <div className="form-group">
                            <Field type="password" id="pass" placeholder="Enter new password" name="password"/>
                            {errors.password && touched.password ? ( <div className='error'>{errors.password}</div>) : null}
                        </div>

                        <div className="form-group">
                            <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                            <Field type="password" id="re_pass" placeholder="Repeat your password" name="confirmPassword"/>
                            {errors.confirmPassword && touched.confirmPassword ? ( <div className='error'>{errors.confirmPassword}</div>) : null}
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

export default ResetPassword;
