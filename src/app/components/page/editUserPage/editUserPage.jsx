import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { validator } from "../../../utils/validator"
import TextField from "../../common/form/textField"
import SelectField from "../../common/form/selectField"
import RadioField from "../../common/form/radioField"
import MultiSelectField from "../../common/form/multiSelectField"
import BackHistoryButton from "../../common/backButton"
import { useDispatch, useSelector } from "react-redux"
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities"
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions"
import { getCurrentUserData, updateUser } from "../../../store/users"

const EditUserPage = () => {
    const currentUser = useSelector(getCurrentUserData())

    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()

    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus())

    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoadingStatus())

    const professionsList = professions.map((profession) => ({ label: profession.name, value: profession._id }))

    const qualitiesList = qualities.map((quality) => ({ label: quality.name, value: quality._id }))

    const [errors, setErrors] = useState({})

    const transformQualities = (elements) => {
        return elements.map((elem) => elem.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { qualities } = data
        const newData = {
            ...data,
            qualities: transformQualities(qualities)
        }
        dispatch(updateUser(newData))
        history.push(`/users/${currentUser._id}`)
    }

    const transformData = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push({
                        label: quality.name,
                        value: quality._id
                    })
                }
            }
        }
        return qualitiesArray
    }

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            const { qualities } = currentUser
            setData(() => ({
                ...currentUser,
                qualities: transformData(qualities)
            }))
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) setIsLoading(false)
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
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

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
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
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
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
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
