import React, {useEffect, useState} from 'react'
import { listEmployees, deleteEmployee } from '../service/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([])

  useEffect(() => { 
    getAllEmployees()
}, [])

  function getAllEmployees () {
     listEmployees().then((response) => {
        setEmployees(response.data)
    }).catch(error => {
        console.error('Error retrieving employees', error)
    })
  }

  function addNewEmployee () {
    navigate ('/add-employee')
  }

  function updateEmployee (id) {
    navigate(`/edit-employee/${id}`)
  }

  function removeEmployee (id) {
    console.log('Deleting employee with id', id)

    deleteEmployee(id).then((response) => {
        getAllEmployees();
    }).catch(err => {
        console.error('Error deleting employee', err);
    })
  }
 
  return (
    <div className='container'>
        <h2 className='text-center'>
            List Of Employees
        </h2>
        <button className="btn btn-primary mb-2 " onClick={addNewEmployee}>
            Add New Employee
        </button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info btn-primary" 
                                onClick={() => updateEmployee(employee.id)}>
                                    Edit</button>
                                <button className="btn btn-danger btn-primary ml-2" 
                                onClick={() => removeEmployee(employee.id)}>
                                    Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent