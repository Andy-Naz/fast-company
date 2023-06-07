import React, { useEffect, useState } from "react"
import SelectField from "../../common/form/selectField"
import TextAreaField from "../../common/form/textAreaField"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"
import api from "../../../api"

const AddComment = ({ onSubmit }) => {
    const [data, setData] = useState({ userId: "", content: "" })
    const [usersName, setUsersName] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }))
    }

    const validatorConfig = {
        userId: {
            isRequired: { message: "Выберите имя пользователя" }
        },
        content: {
            isRequired: { message: "Поле комментария не может быть пустым" }
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

    const clearAddCommentForm = () => {
        setData({ userId: "", content: "" })
        setErrors({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
        onSubmit(data)
        clearAddCommentForm()
    }

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersNameList = Object.keys(data).map((index) => ({
                label: data[index].name,
                value: data[index]._id
            }))
            setUsersName(usersNameList)
        })
    }, [])

    return (
        <>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label=""
                    defaultOption="Выберите пользователя"
                    options={usersName}
                    name="userId"
                    onChange={handleChange}
                    value={data.userId}
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    onChange={handleChange}
                    value={data.content}
                    error={errors.content}
                />
                <button className="btn btn-primary mt-4">Опубликовать</button>
            </form>
        </>
    )
}

AddComment.propTypes = {
    onSubmit: PropTypes.func
}

export default AddComment
