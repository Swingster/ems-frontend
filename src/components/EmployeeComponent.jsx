import React, { useState } from 'react'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    function handleFirstName(e){
        setFirstName(e.target.value);
    }
    function handleLastName(e) {
        setLastName(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }


    function saveEmployee(e){
        e.preventDefault();

        const employee = {firstName, lastName, email}
        console.log(employee)
    }

  return (
    <div className='container'>
        <br /> <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>
                    Add Employee
                </h2>
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input type='text' className='form-control' placeholder='Enter First Name' 
                            value={firstName} onChange={handleFirstName}></input>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Last Name </label>
                            <input type='text' className='form-control' placeholder='Enter Last Name' 
                            value={lastName} onChange={handleLastName}></input>
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Email </label>
                            <input type='email' className='form-control' placeholder='Enter Email' 
                            value={email} onChange={handleEmail}></input>
                        </div>
                        <button className='btn btn-success'
                        onClick={saveEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent