import {config} from "../config";

export const getPath = (method, idInstance, apiTokenInstance) => {
    const {host} = config;
    return `${host}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
};
