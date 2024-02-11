 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Username is a Required Field'),
    email: Yup.string().email('Please enter a valid email address').required('Email is a Required Field'),
    password: Yup.string().min(8, 'Passwored must contains 8 letters').max(50, 'Too Long!').required('Password is a Required Field'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
 });

 export default SignupSchema; 