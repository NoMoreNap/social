import React, { useEffect } from 'react'
import s from './login.module.css'
import { useState } from 'react'
import { useLoginMutation, useRegUserMutation } from '../../redux/thunks'
import { useNavigate } from 'react-router-dom'

export const Form = () => {
    const [action, setAction] = useState('login')
    const [login] = useLoginMutation()
    const [signUp] = useRegUserMutation()

    const navigate = useNavigate()
    const toggler = (e: string) => {
        setAction(e)
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
        }
    }, [])
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const data: { [email: string]: string } = {
            email: '',
            password: '',
        }
        for (let [name, value] of formData) {
            name = name as string
            value = value as string
            data[name] = value
        }
        if (data.repeat) {
            if (data.password === data.repeat) {
                await signUp(data).then((res: any) => {
                    if (res.data) {
                        alert(res.data.detail)
                        location.reload()
                    } else {
                        alert(res.error.data.detail)
                        return
                    }
                })
            }
            alert('Пароли не совпадают!')
        } else {
            await login(formData).then((res: any) => {
                console.log(res)
                if (res.data) {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.user.id)
                    navigate(`/${res.data.user.id}`)
                } else {
                    alert(res.error.data.detail)
                }
            })
        }
    }
    return (
        <section className={s.login}>
            <form onSubmit={formSubmit} className={s.form}>
                {action === 'login' ? <Login toggle={toggler} /> : <SugnUp toggle={toggler} />}
            </form>
        </section>
    )
}

function Login(props: { toggle: (e: string) => void }) {
    const { toggle } = props
    return (
        <>
            <h1 className={s.form_title}>Вход</h1>
            <input name="email" required className={s.form_input} type="email" placeholder="Введите email" />
            <input name="password" required className={s.form_input} type="password" placeholder="Введите пароль" />
            <button className={s.form_btn}>Войти</button>
            <span
                onClick={() => {
                    toggle('signup')
                }}
                className={s.form_switch}
            >
                У вас нет аккаунта?
            </span>
        </>
    )
}
function SugnUp(props: { toggle: (e: string) => void }) {
    const { toggle } = props

    return (
        <>
            <h1 className={s.form_title}>Регистрация</h1>
            <input name="name" required className={s.form_input} type="text" placeholder="Введите имя" />
            <input name="email" required className={s.form_input} type="email" placeholder="Введите email" />
            <input name="password" required className={s.form_input} type="password" placeholder="Введите пароль" />
            <input name="repeat" required className={s.form_input} type="password" placeholder="Повторите пароль" />
            <button className={s.form_btn}>Зарегистрироваться </button>
            <span
                onClick={() => {
                    toggle('login')
                }}
                className={s.form_switch}
            >
                Уже есть аккаунт?
            </span>
        </>
    )
}
