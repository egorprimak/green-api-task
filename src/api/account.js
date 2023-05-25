import axios from "axios";
import {getPath} from "../utils/getPath";

export class AccountService {
    static async getSettings(idInstance, apiTokenInstance) {
        const path = getPath('getSettings', idInstance, apiTokenInstance);
        return await axios.get(path);
    }
}
