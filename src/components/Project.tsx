import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjetosService from "../services/ProjetosService";
import IProjetosData from "../types/Projetos";

const Project: React.FC = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialProjectState = {
        id: null,
        projectName: "",
        projectDescription: "",
        finished: null
    };
    const [currentProject, setCurrentProject] = useState<IProjetosData>(initialProjectState);
    const [message, setMessage] = useState<string>("");
    const getProject = (id: string) => {
        ProjetosService.get(id).then((response: any) => {
            setCurrentProject(response.data);
            console.log(response.data);
        }).catch((e: Error) => {
                console.log(e);
        });
    };

    useEffect(() => {
        if (id) {
            getProject(id);
        }
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentProject({ ...currentProject, [name]: value });
    };

    const updateFinished = (status: boolean) => {
        var data = {
            id: currentProject.id,
            projectName: currentProject.projectName,
            projectDescription: currentProject.projectDescription,
            finished: status
        };
        ProjetosService.update(currentProject.id, data).then((response: any) => {
            console.log(response.data);
            setCurrentProject({...currentProject, finished: status});
            setMessage("Status alterado com sucesso!");
        }).catch((e: Error) => {
            console.log(e);
        });
    };

    const updateProject = () => {
        ProjetosService.update(currentProject.id, currentProject)
            .then((response: any) => {
                console.log(response.data);
                setMessage("The Project was updated successfully!");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteProject = () => {
        ProjetosService.remove(currentProject.id).then(
            (response: any) => {
                console.log(response.data);
                navigate("/projetos");
            }
        ).catch((e: Error) => {
            console.log(e);
        });
    }
    return (
        <div>
            {currentProject ? (
                <div className="edit-form">
                    <h4>Projetos</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="projectName">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="projectName"
                                name="projectName"
                                value={currentProject.projectName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="projectDescription">Descri????o</label>
                            <input
                                type="text"
                                className="form-control"
                                id="projectDescription"
                                name="projectDescription"
                                value={currentProject.projectDescription}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentProject.finished ? "Finished" : "Pending"}
                        </div>
                    </form>
                    {currentProject.finished ? (
                        <button className="badge badge-primary mr-2" onClick={() => updateFinished(false)}>
                            UnFinished
                        </button>
                    ) : (
                        <button className="badge badge-primary mr-2" onClick={() => updateFinished(true)}>
                            Finished
                        </button>
                    )}
                    <button className="badge badge-danger mr-2" onClick={deleteProject}>
                        Delete
                    </button>
                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateProject}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um projeto</p>
                </div>
            )}
        </div>
    );
};

export default Project;