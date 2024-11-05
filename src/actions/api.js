import axios from "axios";
import { dCandidate } from "../reducers/dCandidate";
import { fetchAll } from "./dCandidate";

const isLocalDocker = window.location.host.includes("localhost:8082");

// const baseURL = "http://35.160.120.126/api"
const baseURL = isLocalDocker ? "http://localhost:8082/api/" : process.env.REACT_APP_API_URL || "http://localhost:30193/api/";
// const baseURL = isLocalDocker ? "http://localhost:8082/api/" || "http://localhost:30193/api/" : process.env.REACT_APP_API_URL || "http://localhost:30193/api/";

const apiURL = process.env.REACT_APP_API_URL;

export default {

    // develpment
    // dCandidate(url=baseURL + 'DCandidate/'){
    //     return{
    //         fetchAll: () => axios.get(url),
    //         fetchById: (id) => axios.get(url+id),
    //         create : (newRecord) => axios.post(url,newRecord),
    //         update: (id,updateRecord) => axios.put(url+id,updateRecord),
    //         delete: (id) => axios.delete(url + id)
    //     }
    // }


    // production
    dCandidate(url=apiURL +'/api/' + 'DCandidate/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url+id),
            create : (newRecord) => axios.post(url,newRecord),
            update: (id,updateRecord) => axios.put(url+id,updateRecord),
            delete: (id) => axios.delete(url + id)
        }
    }

}