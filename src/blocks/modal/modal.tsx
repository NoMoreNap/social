import React, { useEffect } from 'react'
import s from './modal.module.css'
import { useEditInfoMutation } from '../../redux/thunks'
import { useNavigate } from 'react-router-dom'

interface DataType {
    id: string
    name: string
    email: string
}

export const ModalEdit = (props: { data: DataType; toggle: (e: boolean) => void }) => {
    const { data, toggle } = props
    const [edit] = useEditInfoMutation()
    const token = localStorage.getItem('token')
    const editData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        await edit({ data: formData, token }).then((res: any) => {
            if (res.data) {
                alert(res.data.detail)
                toggle(false)
                location.reload()

            } else alert(res.error.data.detail)
        })
    }
    return (
        <div className={s.wrapper}>
            <form onSubmit={editData} className={s.form}>
                <span
                    onClick={() => {
                        toggle(false)
                    }}
                    className={s.form_times}
                >
                    &times;
                </span>
                <h1 className={s.form_title}>Изменить данные</h1>
                <input name="email" required className={s.form_input} type="email" placeholder="Введите email" defaultValue={data.email} />
                <input name="name" required className={s.form_input} type="text" placeholder="Введите имя" defaultValue={data.name} />
                <button className={s.form_btn}>Изменить</button>
            </form>
        </div>
    )
}
