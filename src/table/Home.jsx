import React from 'react'
import AppBars from './AppBars'
import PhotosTable from './PhotosTable.jsx'
import PostsTable from './PostsTable'
import TodosTable from './TodosTable'
import UserTable from './UserTable.jsx'
import AlbumsTables from './AlbumsTables'
import { Route, Routes } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <AppBars />
            <Routes>
                <Route path='/' element={<UserTable />} />
                <Route path='/todos-table' element={<TodosTable />} />
                <Route path='/post-table' element={<PostsTable />} />
                <Route path='/album-table' element={<AlbumsTables />} />
                <Route path='/photos-table' element={<PhotosTable />} />
            </Routes>


        </>
    )
}

export default Home