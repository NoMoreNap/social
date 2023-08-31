import React, { useState } from 'react'
import { useGetAllPostsQuery } from '../../redux/thunks'
import { ModalEditPost } from '../modal/modal'
import s from './posts.module.css'

const AdminTool = (props: { toggle: (e: boolean) => void; id: string; setId: (e: string) => void }) => {
    const { toggle, id, setId } = props
    return (
        <button
            onClick={() => {
                toggle(true)
                setId(id)
            }}
            className={s.btn}
        >
            Редактировать
        </button>
    )
}

const RenderPosts = (props: { posts: any; isMyProfile: boolean; toggle: (e: boolean) => void; setId: (e: string) => void }) => {
    const { posts, isMyProfile, toggle, setId } = props
    console.log(posts)
    const data = posts.map((el: { id: string; photo: string; title: string; content: string }): JSX.Element => {
        return (
            <div key={el.id} className={s.post}>
                <div className={s.img_block}>
                    <img className={s.img} src={el.photo} alt="" />
                </div>
                <div className={s.info}>
                    <h1>{el.title}</h1>
                    <p>{el.content}</p>
                </div>
                {isMyProfile ? <AdminTool toggle={toggle} id={el.id} setId={setId} /> : <></>}
            </div>
        )
    })
    return data
}

export const Posts = (props: { email: string; isMyProfile: boolean }) => {
    const { email, isMyProfile } = props
    const [modal, setModal] = useState(false)
    const [id, setPostId] = useState('0')
    const setId = (e: string) => {
        setPostId(e)
    }

    const toggle = (e: boolean) => {
        setModal(e)
    }
    const { data, isSuccess, isLoading } = useGetAllPostsQuery(1)
    if (isLoading || !isSuccess || !data) return <></>
    const posts = data.results.filter((el: { user_email: string }) => {
        return el.user_email === email
    })
    return (
        <section className={s.wrapper}>
            {posts.length ? <RenderPosts posts={posts} isMyProfile={isMyProfile} toggle={toggle} setId={setId} /> : <h1> Постов нет :( </h1>}
            {modal ? <ModalEditPost id={id} toggle={toggle} /> : <></>}
        </section>
    )
}
