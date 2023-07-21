import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"
import CheckBoxField from "../common/form/checkBoxField"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logIn } from "../../store/users"

const LoginForm = () => {
    const history = useHistory()
    const [data, setData] = useState({ email: "", password: "", stayOn: false })
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
            min: { message: "Пароль должен содержать не менее 8 символов", value: 8 }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const redirect = history.location.state ? history.location.state.from.pathname : "/"
        dispatch(logIn({ payload: data, redirect }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
                Оставаться в системе
            </CheckBoxField>
            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                Отправить
            </button>
        </form>
    )
}

export default LoginForm
