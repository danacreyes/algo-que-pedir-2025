import { useEffect, useState } from 'react'
import { ValidationMessage } from '../../domain/validationMessage'
import '../css/validationField.css'

const ValidationField = ({field, errors} : {field: string, errors: ValidationMessage[]}) => {
  
    const errorsFrom = (errors: ValidationMessage[], field: string) => errors
    .filter((_) => _.field === field)
    .map((_) => _.message)
    .join('. ')

    const [errorMessage, setErrorMessage] = useState<string>('')
    
    useEffect(() => {
        setErrorMessage(errorsFrom(errors, field))
    }, [errors])
  
    return (
        <>
        {!!errorMessage && (
            <div className='error' data-testid={'error-field-' + field}>
                {errorMessage}
            </div>
        )}
        </>
  )
}

export default ValidationField