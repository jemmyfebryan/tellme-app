"use client"

import { createContext, useContext, FC, ReactNode, useState } from 'react';

interface ChatContextProps {
    children: ReactNode;
}

interface ChatContextValue {
    messages: Message[];
    addMessage: (message: Message) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatRoom: FC<ChatContextProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
        {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
