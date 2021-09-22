import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navigate, Route, Routes } from 'react-router'
import { EpicScreen } from 'screens/epic'
import { KanbanScreen } from 'screens/kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <NavLink to={'kanban'}>看板</NavLink>
      <NavLink to={'epic'}>任务组</NavLink>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />} />
        <Route path={'epic'} element={<EpicScreen />} />
        <Navigate to={'kanban'} replace={true} />
      </Routes>
    </div>
  )
}
