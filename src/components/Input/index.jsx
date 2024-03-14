import Button from 'react-bootstrap/Button';
import React from 'react'
import Form from 'react-bootstrap/Form';
import {useFormik} from "formik"
import { generateID } from '../../utils/generateID';

function Input({onData}) {

  const {resetForm,handleChange,handleSubmit, values} = useFormik({
    initialValues:{title:"", desc:""},
    onSubmit:(data)=>{
      data.id = generateID()
      console.log("data", data);
      
      onData(data);
      resetForm();
    },
  })

  return (
    <div className='p-5 w-50 mx-auto'>
       <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title"
         name="title"
        value={values.title}
         onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="Description"
         name="desc"
         value={values.desc}
          onChange={handleChange} />
      </Form.Group>
      <Button onClick={handleSubmit} variant="outline-success" size='lg' className='w-100'>Add</Button>

    </div>
  )
}

export default Input
