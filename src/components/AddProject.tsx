import React, { useState, ChangeEvent } from "react";
import ProjetosService from "../services/ProjetosService";
import IProjetosData from "../types/Projetos";

const AddProject: React.FC = () => {
    const initialProjectState = {
        id: null,
        projectName: "",
        projectDescription: "",
        finished: false
    };

    const [projeto, setProjeto] = useState<IProjetosData>(initialProjectState);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProjeto({ ...projeto, [name]: value });
    };

    const saveProject = () => {
        var data = {
            projectName: projeto.projectName,
            projectDescription: projeto.projectDescription
        };
        ProjetosService.create(data).then((response: any) => {
            setProjeto({
                id: response.data.id,
                projectName: response.data.projectName,
                projectDescription: response.data.projectDescription,
                finished: response.data.finished
            });
            setSubmitted(true);
            console.log(response.data);
        }).catch((e: Error) => {
            console.log(e);
        });
    };

    const newProject = () => {
        setProjeto(initialProjectState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Projeto Salvo com sucesso!</h4>
                    <button className="btn btn-success" onClick={newProject}>Add</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="projectName">Nome do Projeto</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectName"
                            required
                            value={projeto.projectName}
                            onChange={handleInputChange}
                            name="projectName"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectDescription"
                            required
                            value={projeto.projectDescription}
                            onChange={handleInputChange}
                            name="projectDescription"
                        />
                    </div>
                    <button onClick={saveProject} className="btn btn-success">Salvar</button>
                </div>
            )}
        </div>
    );
};

export default AddProject;