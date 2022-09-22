import React from "react";
import style from "./OdaAdm.module.css"

import { Routes, Route, Link } from "react-router-dom";
import ProjectList from "../../components/ProjectList/ProjectList";
import AddProject from "../../components/AddProject";
import Project from "../../components/Project";

const OdaAdm: React.FC = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/projetos" className="navbar-brand">
                    Oda Administrativo
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/projetos"} className="nav-link">
                            Projetos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Adicionar
                        </Link>
                    </li>
                </div>
            </nav>
            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<ProjectList />} />
                    <Route path="/projetos" element={<ProjectList />} />
                    <Route path="/add" element={<AddProject />} />
                    <Route path="/projetos/:id" element={<Project />} />
                </Routes>
            </div>
        </div>
    );
};

export default OdaAdm;