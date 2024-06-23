import React, { useState } from 'react'
import ProjectsSidebar from "./components/ProjectsSidebar";
import NoProjectSelected from "./components/NoProjectSelected";
import NewProject from "./components/NewProject";
import SelectedProject from './components/SelectedProject';

function App() {
  const [projects, setProjects] = useState({
    selectedProjectId: undefined,
    project: [],
    tasks: [],
  })

  const handleAddTask = (text) => {
    setProjects(prev => ({
      ...prev,
      tasks: [...prev.tasks, {
        id: Math.random(),
        text: text,
        projectId: prev.selectedProjectId,
      }]
    }))
  }

  const handleDeleteTask = (id) => {
    setProjects(prev => ({
      ...prev,
      tasks: prev.tasks.filter(p => p.id !== id)
    }))
  }

  const handleStartAddProject = () => {
    setProjects(prev => ({ ...prev, selectedProjectId: null }))
  }

  const handleCancelProject = () => {
    setProjects(prev => ({ ...prev, selectedProjectId: undefined }))
  }

  const handleSelectProject = id => {
    console.log(id);
    setProjects(prev => ({
      ...prev,
      selectedProjectId: id,
    }))
  }

  const handleAddProject = (projectData) => {
    const newProject = {
      ...projectData,
      id: Math.random()
    }

    setProjects(prev => ({
      ...prev,
      selectedProjectId: undefined,
      project: [...prev.project, newProject]
    }))
  }

  const handleDeleteProject = () => {
    setProjects(prev => ({
      ...prev,
      selectedProjectId: undefined,
      project: prev.project.filter(p => p.id !== prev.selectedProjectId)
    }))
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projects.project} />
      {projects.selectedProjectId === null
        ? <NewProject onAdd={handleAddProject} onCancel={handleCancelProject} />
        : projects.selectedProjectId === undefined
          ? <NoProjectSelected onStartAddProject={handleStartAddProject} />
          : <SelectedProject
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onDelete={handleDeleteProject}
            selectedProjectId={projects.selectedProjectId}
            tasks={projects.tasks}
            project={projects.project.find(p => p.id === projects.selectedProjectId)}
          />
      }

    </main>
  );
}

export default App;
