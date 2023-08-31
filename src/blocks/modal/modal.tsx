import React from 'react'
import s from './modal.module.css'
import { useEditInfoMutation, useEditPostMutation, useGetByIdQuery, useDelMutation } from '../../redux/thunks'
import { MediaSelector } from '../addpost/add'

export interface DataType {
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

export const ModalEditPost = (props: { id: string; toggle: (e: boolean) => void }) => {
    const { id, toggle } = props
    const [edit] = useEditPostMutation()
    const [del] = useDelMutation()
    const { data, isLoading } = useGetByIdQuery(id)
    const token = localStorage.getItem('token')
    const editData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const { elements } = form
        let formData = new FormData()
        Array.from(elements).forEach((el) => {
            if (el instanceof HTMLInputElement) {
                const { name, value } = el
                if (value) {
                    if (name === 'photo') {
                        formData = new FormData(form)
                        return
                    } else {
                        formData.append(name, value)
                    }
                }
            }
        })
        await edit({ data: formData, token, id }).then((res: any) => {
            if (res.data) {
                toggle(false)
            } else alert(res.error.data.detail)
        })
    }
    const deleteData = async () => {
        await del({ token, id }).then((res) => toggle(false))
    }

    if (!data || isLoading) return <></>

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
                <input name="title" required className={s.form_input} type="text" placeholder="Введите название" defaultValue={data.title} />
                <input name="content" required className={s.form_input} type="text" placeholder="введите контент" defaultValue={data.content} />
                <div>
                    <label className={s.media} htmlFor={s.photo}>
                        {<MediaSelector />}
                    </label>
                    <input id={s.photo} name="photo" type="file" />
                </div>
                <button className={s.form_btn}>Изменить</button>
                <button onClick={deleteData} type="button" className={s.form_btn__del}>
                    Удалить
                </button>
            </form>
        </div>
    )
}
