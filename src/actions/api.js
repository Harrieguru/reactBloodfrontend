import axios from "axios";
import { dCandidate } from "../reducers/dCandidate";
import { fetchAll } from "./dCandidate";

// const baseURL = "http://35.160.120.126/api"
const baseURL = "http://localhost:30193/api/"

export default {

    dCandidate(url=baseURL + 'DCandidate/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: (id) => axios.get(url+id),
            create : (newRecord) => axios.post(url,newRecord),
            update: (id,updateRecord) => axios.put(url+id,updateRecord),
            delete: (id) => axios.delete(url + id)
        }
    }

}