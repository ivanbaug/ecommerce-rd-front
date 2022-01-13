import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { useParams } from 'react-router-dom'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()


  const userId = params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate



  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    }
    else {
      if (!user.name || Number(user._id) !== Number(userId)) {
        dispatch(getUserDetails(userId))
      }
      else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.is_admin)
      }
    }

  }, [user, userId, dispatch, navigate, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(name, email, isAdmin)
    dispatch(updateUser({ _id: user._id, name, email, isAdmin }))

  }
  return (
    <div>
      <Link to='/admin/userlist'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading
          ? <Loader />
          : error
            ? <Message variant='danger'>{error}</Message>
            : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>
                    Name
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='email'>
                  <Form.Label>
                    Email Address
                  </Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  >
                  </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-4' >Update</Button>
              </Form>
            )
        }
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
