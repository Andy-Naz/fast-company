import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import PropTypes from "prop-types"
import TextField from "../common/form/textField"
import api from "../../api"
import SelectField from "../common/form/selectField"
import RadioField from "../common/form/radioField"
import MultiSelectField from "../common/form/multiSelectField"
import { useHistory } from "react-router-dom"

const EditForm = ({ user }) => {
    const userQualities = Object.keys(user.qualities).map((quality) => ({
        label: user.qualities[quality].name,
        value: user.qualities[quality]._id
    }))

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: userQualities
    })

    const [qualities, setQualities] = useState([])
    const [professions, setProfession] = useState([])
    const [errors, setErrors] = useState({})

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }

    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfession(professionsList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        name: {
            isRequired: { message: "Имя обязательно для заполнения" }
        },
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        profession: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
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
        const { profession, qualities } = data
        console.log("submit", {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
    }

    const history = useHistory()

    const updateDataUser = async () => {
        const { profession, qualities } = data
        const newData = {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }
        await api.users.update(user._id, newData)
        history.push(`/users`)
    }

    if (professions.length > 0 && qualities.length > 0) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professions}
                                value={data.profession}
                                onChange={handleChange}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                                onClick={updateDataUser}
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return "loading..."
}

EditForm.propTypes = {
    user: PropTypes.object
}

export default EditForm
