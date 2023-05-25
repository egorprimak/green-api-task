import axios from "axios";
import {getPath} from "../utils/getPath";

export class SendingService {
    static async sendMessage(idInstance, apiTokenInstance, params) {
        const message = {chatId: params.chatId, message: params.message};
        const path = getPath('sendMessage', idInstance, apiTokenInstance);
        return await axios.post(path, message);
    }
}
