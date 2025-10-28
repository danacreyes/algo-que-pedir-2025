import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import { CookingPot, } from 'phosphor-react'
import './login-register.css'
import { UserJSONLoginRequest, UserType } from '../../domain/user';
import { userService } from '../../services/UserService';
import { ValidationMessage } from '../../domain/validationMessage';
import ValidationField from '../../components/ValidationField';
// import { showError } from '../domain/errorHandler';
import { getErrorMessage } from '../../domain/errorHandler';
import { Toast } from '../../components/toast/ToastContainer';
import { useToast } from '../../components/toast/useToast';

const Login = () => {
  const { toast, showToast } = useToast()
  
  const navigate = useNavigate();
  const [user, setUser] = useState<UserJSONLoginRequest>({email: '', password: ''});
  const [errors, setErrors] = useState<Array<ValidationMessage>>([])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const userLogin = new UserType(
      'nombre',
      'apellido',
      (formData.get("password") ?? "").toString(),
      (formData.get("email") ?? "").toString(),
    );

    userLogin.validate();
    // console.log(userLogin.errors);
    // console.log(userLogin);

    if (userLogin.errors.length > 0) {
      setErrors(userLogin.errors);
      return errors
      // return userLogin.errors
    }

    try {
      let validation = await userService.getUser(userLogin.email, userLogin.password)
        if (validation) navigate("/") // si devuelve Truthy redirige a home
    } catch (error) {
      // alert(`Email: ${user.email}, Password: ${user.password}`);
      // alert('Error en el login. Verifique sus credenciales.');
      const errorMessage = getErrorMessage(error)
      showToast(errorMessage, 'error')
    } finally {
      setErrors([]);
    }
  };

  const actualizar = (clave: keyof typeof user, valor: unknown) => {
    setUser({
      ...user,
      [clave]: valor
    })
  }
    
  return (
    <div className="main-container-login">
      <div className='header-logo'>
        <CookingPot weight='fill' className='cooking-pot-logo'></CookingPot>
        <h1>Algo que pedir</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        id='login-form'
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '80vw' }}
      >
        <TextField
          id='email'
          label="Email*"
          type="email"
          name='email'
          value={user.email}
          onChange={(e) => actualizar('email', e.target.value)}
        />
        <ValidationField field='email' errors={errors} />

        <TextField
          id='password'
          label="Contraseña*"
          type="password"
          name='password'
          value={user.password}
          onChange={(e) => actualizar('password', e.target.value)}
        />
        <ValidationField field='password' errors={errors} />

        <Button variant="contained" color="primary" 
          type="submit"
          sx={{
            backgroundColor: 'var(--primary-color)',
            borderRadius: '2em',
            '&:hover': {
              backgroundColor: 'var(--button-hover-color)',
            }
          }}
        >
          Iniciar sesión
        </Button>
      </form>

      <span>¿No tenes cuenta? <Link to={'/register'}>Registrate</Link></span>

      <div id="toast-container">
        <Toast toast={toast} />
      </div>
    </div>
  )
}

export default Login