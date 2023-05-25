import axios from "axios";
import {getPath} from "../utils/getPath";

export class ReceivingService {
    static async receiveNotification(idInstance, apiTokenInstance) {
        const path = getPath('receiveNotification', idInstance, apiTokenInstance);
        return await axios.get(path);
    }
}
