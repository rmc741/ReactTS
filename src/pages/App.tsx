import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Project from "../components/Project";
import ProjectList from "../components/ProjectList";
import AddProject from "../components/AddProject";
import OdaAdm from "./Administrativo/OdaAdm";

export default function App() {
  return (
    <div className="App">
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
          <Route path="/" element={<ProjectList/>} />
          <Route path="/projetos" element={<ProjectList/>} />
          <Route path="/add" element={<AddProject/>} />
          <Route path="/projetos/:id" element={<Project/>} />
        </Routes>
        <OdaAdm/>
      </div>
    </div>
  );
}
