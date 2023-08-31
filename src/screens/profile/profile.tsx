import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AddPost } from '../../blocks/addpost/add'
import { ModalEdit } from '../../blocks/modal/modal'
import { useGetInfoQuery } from '../../redux/thunks'
import s from './profile.module.css'
const mockAvatar = 'https://sun9-13.userapi.com/impg/h217leEu2Df1jLI5L54SXZeTmwuN967bIoWomA/VqOlKH8uCwY.jpg?size=735x511&quality=95&sign=a806fb8e069ff2859474492fc3fc70a1&type=album'

const EditProfile = (props: { toggle: (e: boolean) => void }) => {
    const { toggle } = props
    return (
        <button
            onClick={() => {
                toggle(true)
            }}
            className={s.profile_edit}
        >
            Редактировать профиль
        </button>
    )
}

export const Profile = () => {
    const { id } = useParams()
    const isMyProfile = id === localStorage.getItem('id')
    const { data, isSuccess, isLoading, isError } = useGetInfoQuery(id)
    const [modal, isModal] = useState(false)
    const navigate = useNavigate()
    const toggle = (e: boolean) => {
        isModal(e)
    }
    if (isError) {
        navigate(`/${localStorage.getItem('id')}`)
        console.error('Такого пользователя не существует.')
    }
    if (isLoading || !isSuccess || !data) return <></>
    console.log(data)

    return (
        <section className={s.main}>
            <div className={s.profile}>
                <div className={s.profile_ava}>
                    <img src={mockAvatar} alt="" />
                </div>
                <div className={s.profile_info}>
                    <h1>{data.name === null ? 'Призрак' : data.name}</h1>
                    <p>
                        <span>email:</span> {data.email}
                    </p>
                    <p>
                        <span>id:</span> {data.id}
                    </p>
                </div>
                {isMyProfile ? <EditProfile toggle={toggle} /> : <></>}
            </div>
            {modal ? <ModalEdit data={data} toggle={toggle} /> : <></>}
            {isMyProfile ? <AddPost ava={mockAvatar} /> : <></>}
        </section>
    )
}
