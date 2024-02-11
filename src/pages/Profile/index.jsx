
import './profile.css'
import Navbar from '../../components/navbar'
import { useState } from 'react';
import ProfileSchema from '../../_schemas/profileScema';
import { Formik, Form, Field } from 'formik';
import { AccountContext } from '../../contexts/accountContext';

function Profile() {

  const [loading, setLoading] = useState(false);
  const {user, updateProfile} = AccountContext()


    const handleForm = async(data) =>{
        console.log(data);
        try {
          setLoading(true);
          console.log(data);
          let result = await updateProfile(data);
          console.log(result);
          setLoading(false);
    
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      }


  return (
    <>
    <div className="profile-section">
    <Navbar />
      
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8 mx-auto">
            <h2 className="h3 mb-4 page-title">Settings</h2>
            <div className="my-4"> 
            <Formik 
                 initialValues={{
                    email : user?.email || '',
                    company : user?.company || '',
                    address : user?.address || '',
                    profile_photo : '',
                    old_password : '',
                    password : '',
                    confirmPassword : ''
                  }}
                  validationSchema={ProfileSchema}
                  onSubmit= {values => {
                    handleForm(values);
                  }}>
                {({ errors, touched }) => (    
                <Form>
                    <div className="row mt-5 align-items-center">
                        <div className="col-md-4 text-center">
                            <div className="avatar avatar-xl mb-5">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." className="avatar-img rounded-circle" /> 
                                {/* <img src="profileDetails?.profile_photo" className="avatar-img rounded-circle" /> */}
                            </div>

                            <div className="input-group mb-4">
                                {/* <input type="file" className="form-control"  onChange="onFileChange($event)"> */}
                            </div>
                        </div>
          
                         
                        <div className="col">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    <h4 className="mb-1">{user?.username || 'N/A'}</h4>
                                    <p className="small mb-3"><span className="badge badge-dark">New York, USA</span></p>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-7">
                                    <p className="text-muted">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus. In hac habitasse platea dictumst. Cras urna quam, malesuada vitae risus at,
                                        pretium blandit sapien.
                                    </p>
                                </div>
                                <div className="col">
                                    <p className="small mb-0 text-muted">Nec Urna Suscipit Ltd</p>
                                    <p className="small mb-0 text-muted">P.O. Box 464, 5975 Eget Avenue</p>
                                    <p className="small mb-0 text-muted">(92) 311-7136098</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="form-group mb-4 col-md-6">
                            <input type="text" className="form-control shadow-none" placeholder='Username'
                             readOnly disabled />
                        </div>
                        <div className="form-group mb-4 col-md-6">
                            <Field type="text" className="form-control" placeholder="Email here" name="email" />
                            {errors.email && touched.email ? ( <div className='error'>{errors.email}</div>) : null}

                        </div>
                    </div>
                    <div className="form-group mb-4">
                            <Field type="text" className="form-control" id="inputAddress5" placeholder="Address" name="address"/>
                            {errors.address && touched.address ? ( <div className='error'>{errors.address}</div>) : null}
                    </div>
                    <div className="row mb-4">
                        <div className="form-group col-md-6">
                            <Field type="text" className="form-control" placeholder="company name" name="company" />
                            {errors.company && touched.company ? ( <div className='error'>{errors.company}</div>) : null}

                        </div>
                        <div className="form-group col-md-4">
                            <select id="inputState5" className="form-control">
                                <option value=''>Choose State</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <input type="text" className="form-control" placeholder="Postal Code" />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <div className="form-group mb-2">
                                <Field type="password" className="form-control" name="old_password" placeholder='Old Password'/>
                                {errors.old_password && touched.old_password ? ( <div className='error'>{errors.old_password}</div>) : null}
                                 </div>
                            <div className="form-group mb-2">
                                <Field type="password" className="form-control" id="inputPassword5" name="password"  placeholder='New Password'/>
                                {errors.password && touched.password ? ( <div className='error'>{errors.password}</div>) : null}
                            </div>
                            <div className="form-group mb-2">
                                <Field type="password" className="form-control" id="inputPassword6" name="confirmPassword"  placeholder='Confirm Password'/>
                                {errors.confirmPassword && touched.confirmPassword ? ( <div className='error'>{errors.confirmPassword}</div>) : null}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-2">Password requirements</p>
                            <p className="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                            <ul className="small text-muted pl-4 mb-0">
                                <li>Minimum 8 character</li>
                                <li>At least one special character</li>
                                <li>At least one number</li>
                                <li>Can’t be the same as a previous password</li>
                            </ul>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Change
                      {loading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                    </button>
                </Form>
                )}
            </Formik>
            </div>
        </div>
    </div>
    
    </div>

    </div>
    </>
  )
}

export default Profile
