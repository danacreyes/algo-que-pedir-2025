import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material'
import {Button} from '@mui/material'
import './login-register.css'
import { UserJSONLoginRequest, UserJSONRegisterRequest, UserType } from '../../domain/user';
import { userService } from '../../services/UserService';
import { ValidationMessage } from '../../domain/validationMessage';
import ValidationField from '../../components/ValidationField';
import { getErrorMessage } from '../../domain/errorHandler';
import { Toast } from '../../components/toast/ToastContainer';
import { useToast } from '../../components/toast/useToast';
import { CookingPot } from 'phosphor-react';

const Register = () => {
    const { toast, showToast } = useToast()
  
  const navigate = useNavigate();
  const [user, setUser] = useState<UserJSONRegisterRequest>({name:'', lastName: '', email: '', password: '', passwordRetry: ''});
  const [errors, setErrors] = useState<Array<ValidationMessage>>([])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const userRegister = new UserType(
      'nombre',
      'apellido',
      (formData.get("password") ?? "").toString(),
      (formData.get("email") ?? "").toString(),
    );

    userRegister.validate();
    // console.log(userRegister.errors);
    // console.log(userRegister);

    if (userRegister.errors.length > 0) {
      setErrors(userRegister.errors);
      return errors
      // return userRegister.errors
    }

    try {
      if (formData.get("password") != formData.get("password-retry")) {
        showToast('Las contraseñas no coinciden.', 'error')
        return
      }
        await userService.createUser(userRegister)

        showToast('Usuario generado con exito. Seras redirigido a la pagina de Ingreso', 'success', 2000)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showToast(errorMessage, 'error', 100000)
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
        <h1>Crea tu cuenta</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        id='login-form'
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}
      >
        <TextField
          id='email'
          label="Email*"
          type="email"
          name='email'
          value={user.email}
          onChange={(e) => actualizar('email', e.target.value)}
          error={!errors?.every(valMess => valMess.field != 'email')}
        />
        <ValidationField field='email' errors={errors} />

        <TextField
          id='password'
          label="Contraseña*"
          type="password"
          name='password'
          value={user.password}
          onChange={(e) => actualizar('password', e.target.value)}
          error={!errors?.every(valMess => valMess.field != 'password')}
        />
        <ValidationField field='password' errors={errors} />

        <TextField
          id='password-retry'
          label="Re-ingrese la contraseña*"
          type="password"
          name='password-retry'
          value={user.passwordRetry}
          onChange={(e) => actualizar('passwordRetry', e.target.value)}
          error={!errors?.every(valMess => valMess.field != 'password')}
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
          Registrarme
        </Button>
      </form>

          <span>Ya tengo cuenta. <Link to={'/login'}>Iniciar Sesión</Link></span>

      <div id="toast-container">
        <Toast toast={toast} />
      </div>
    </div>
  )
}

export default Register