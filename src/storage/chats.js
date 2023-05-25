import {CHATS_KEY} from "../consts";

const getChatObjects = () => {
    const storageChats = localStorage.getItem(CHATS_KEY);
    if (!storageChats) {
        return [];
    }
    return JSON.parse(storageChats);
};

export const getChatsByIdInstance = idInstance => {
    const allChats = getChatObjects();
    if (!allChats.length) {
        return;
    }

    return allChats.find(i => i.idInstance === idInstance);
};

const saveChatsToStorage = chats => {
    if (!chats || !chats.length) {
        return;
    }
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
};

export const saveChatToStorage = (idInstance, chat) => {
    const allChats = getChatObjects();
    const chatObject = {idInstance, chats: [chat]};

    if (!allChats.length) {
        saveChatsToStorage([chatObject]);
        return;
    }

    const userChatsData = allChats.find(c => c.idInstance === idInstance);
    if (!userChatsData) {
        allChats.push(chatObject);
        saveChatsToStorage(allChats);
        return;
    }

    const filteredUserChats = userChatsData.chats.filter(c => c.chatId !== chat.chatId);
    userChatsData.chats = [...filteredUserChats, chat];
    saveChatsToStorage(allChats);
};

export const deleteChatFromStorage = (idInstance, chatId) => {
    const allChats = getChatObjects();
    if (!allChats.length) {
        return;
    }

    const userChatsData = allChats.find(c => c.idInstance === idInstance);
    if (!userChatsData) {
        return;
    }

    userChatsData.chats = userChatsData.chats.filter(c => c.chatId !== chatId);
    saveChatsToStorage(allChats);
}

