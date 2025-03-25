import React, { useState } from 'react'
import { createEmployee, getEmployee } from '../service/EmployeeService'
import { useNavigate, useParams, useEffect } from 'react-router-dom'


const EmployeeComponent = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [id])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams;

    function handleFirstName(e){
        setFirstName(e.target.value);
    }
    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

    function saveEmployee(e){
        e.preventDefault();

        if(validationForm()){
            const employee = {firstName, lastName, email}
        console.log(employee)

        createEmployee(employee).then((response) => {
            console.log(response.data);
            navigate('/employees');
        });
    }
}

    function validationForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;  
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;  
        }

        if(email.trim()){
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;  
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br /> <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type='text' 
                            className={`form-control ${ errors.firstName ? 'is-invalid': ''}`} 
                            placeholder='Enter First Name' 
                            value={firstName} 
                            onChange={handleFirstName}>
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName}</div>}
                        </div> 
                        <div className='form-group'>
                            <label className='form-label'>Last Name </label>
                            <input type='text' 
                            className={`form-control ${ errors.lastName ? 'is-invalid': ''}`} 
                            placeholder='Enter Last Name' 
                            value={lastName} 
                            onChange={handleLastName}>
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName}</div>}
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Email </label>
                            <input type='email' 
                            className={`form-control ${ errors.email ? 'is-invalid': ''}`} 
                            placeholder='Enter Email' 
                            value={email} 
                            onChange={handleEmail}>
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                        </div>
                        <button className='btn btn-success mt-3'
                        onClick={saveEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent