import React , {useState , useEffect , ChangeEvent} from "react";
import ProjetosService from "../services/ProjetosService";
import IProjetosData from "../types/Projetos";
import { Link } from "react-router-dom";

const ProjectList: React.FC = () => {
    const [projetos , setProjetos] = useState<Array<IProjetosData>>([]);
    const [currentProject , setCurrentProject] = useState<IProjetosData | null>(null);
    const [currentIndex , setCurrentIndex] = useState<number>(-1);
    useEffect(() => {
        retrieveProject();
    }, []);
    const retrieveProject = () => {
        ProjetosService.getAll()
            .then((response: any) => {
                setProjetos(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const refreshList = () =>{
        retrieveProject();
        setCurrentProject(null);
        setCurrentIndex(-1);
    };
    const setActiveProject = (projeto: IProjetosData , index: number) => {
        setCurrentProject(projeto);
        setCurrentIndex(index);
    };
    return(
        <div className="list row">
            <div className="col-md-6">
                <h4>Lista de Projetos</h4>
                <ul className="list-group">
                    {projetos && projetos.map((projeto , index)=> (
                        <li
                            className={"list-group -item" +(index === currentIndex ? "active" : "")}
                            onClick={() => setActiveProject(projeto , index)}
                            key={index}
                        >
                            {projeto.projectName}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentProject ? (
                    <div>
                        <h4>Projeto</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentProject.projectName}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentProject.projectDescription}
                        </div>
                        <Link
                            to={"/projetos/" + currentProject.id}
                        >Edit</Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Por favor selecione um projeto</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;