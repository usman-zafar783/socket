import * as Yup from 'yup';
 
const ProfileSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Email is a Required Field'),
    password: Yup.string().min(8, 'Passwored must contains 8 letters').max(20, 'Too Long!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    company: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!'),
    address: Yup.string().min(3, 'Too Short!').max(20, 'Too Long!'),
    old_password: Yup.string().min(8, 'Passwored must contains 8 letters!').max(20, 'Too Long!'),

// profile_photo

});

export default ProfileSchema; 