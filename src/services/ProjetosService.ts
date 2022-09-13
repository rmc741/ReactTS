import http from "../api/http-oda";
import IProjetosData from "../types/Projetos"; 

const getAll = () => {
    return http.get<Array<IProjetosData>>("/all");
};

const get = (id: any) => {
    return http.get<IProjetosData>(`${id}`);
};

const create = (data: IProjetosData) => {
    return http.post<IProjetosData>("/add" , data);
};

const update = (id:any , data: IProjetosData) => {
    return http.put<any>(`/edit/${id}` , data);
};

const remove = (id: any) => {
    return http.delete<any>(`/delete/${id}`);
};

const findByTitle = (projectName: string) => {
    return http.get<Array<IProjetosData>>(`/projeto?projectName=${projectName}`);
};

const ProjetosService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle,
};

export default ProjetosService;