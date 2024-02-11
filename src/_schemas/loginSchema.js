 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
     email: Yup.string().email('Please enter a valid email address').required('Email is a Required Field'),
     password: Yup.string()
       .min(8, 'Passwored must contains 8 letters')
       .max(50, 'Too Long!')
       .required('Password is a Required Field'),
 });

 export default SignupSchema; 