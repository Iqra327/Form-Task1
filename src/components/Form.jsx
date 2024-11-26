import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    reValidateMode: 'onSubmit',
  });
  
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = () => {
    setSubmitted(true);
  }
  
  return (
    <>
      {
        submitted ? 
          <h1 className='success-msg'>
            Registration successful!
          </h1> : 
          <div className='form-div'>
            <h1 className='heading'>Registration Form</h1>
          
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <label htmlFor='userName'>Username</label>
              <input 
                type="text"
                id='userName'
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 5,
                    message: "Username is shorter than 5 characters"
                  }
                })} 
              />
              <p className='error'>
                {errors.username?.message}
              </p>

              <label htmlFor='email'>Email</label>
              <input 
                type="email"
                id='email' 
                {...register('email',{
                  required: 'Email is required',
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Email format is invalid'
                  }
                })}
              />
              <p className='error'>
                {errors.email?.message}
              </p>

              <label htmlFor='password'>Password</label>
              <input 
                type="password"
                id='password'
                {...register('password',{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password is shorter than 8 characters'
                  }
                })} 
              />
              <p className='error'>
                {errors.password?.message}
              </p>

              <label htmlFor='confirmPass'>Confirm Password</label>
              <input 
                type="password"
                id='confirmPass'
                {...register('confirmPass',{
                  required: 'Please Confirm Your password',
                  validate: (value) => {
                    if(watch('password') !== value){
                      return "Password and Confirm Password do not match"
                    }
                  }
                })} 
              />
              <p className='error'>
                {errors.confirmPass?.message}
              </p>
              
              <button className='register-btn'>
                Register
              </button>
            </form>
          </div>
        }
    </>
  )
}

export default Form;