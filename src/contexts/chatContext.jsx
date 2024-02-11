import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {io} from 'socket.io-client'
import { AccountContext } from "./accountContext";
import api from "../_helpers/JWT_Interceptor";

const chatContext = createContext();



const ChatContextProvider = ({children}) =>{
    const { user } = AccountContext();
    const [socket, setSocket] = useState(null);
    const [userChats, setUserChats] = useState(null);
    const [userChatsLoading, setUserChatsLoading] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    const [potentialChats, setPotentialChats] = useState([]);

        
    // Initial Socket
    useEffect(() => {
      const newSocket = io('http://localhost:3000')
      setSocket(newSocket);
      return () =>{
        newSocket.disconnect();
      }
    }, [user])


    
    // Get Online Users
    useEffect(() => {
      if(socket === null) return;
      socket.emit('addNewUser', user?.id)
      socket.on('getOnlineUsers', (res) =>{
          setOnlineUsers(res)
      });

      return () =>{
        socket.off('getOnlineUsers')
      }
    }, [socket])


    
    /// Send Message 
    useEffect(() => {
      if(socket === null) return;
      const recipentID = currentChat?.members?.find(id => id !== user.id)
      console.log(newMessage, recipentID);
      socket.emit('sendMessage', {...newMessage, recipentID})
    }, [newMessage])

    
    /// Receive Message
    useEffect(() => {
      if(socket === null) return;
      
      socket.on('getMessage', res =>{
        console.log(res);
        if(currentChat?._id !== res.chatID) return;
        setMessages(((prev) => [...prev, res]))
      })

      return () =>{
        socket.off('getMessage')
      }
    }, [socket, currentChat])





    useEffect(() => {
      const fetchAllUsers = async () => {
        const res = await api.get(`/chats/get-users`);

        const pChats = res?.data?.result.filter(u =>{
          let isChatCreated = false;

          if(user.id===u._id) return false;

          if(userChats){
            isChatCreated = userChats?.some(chat =>{
              return chat?.members[0] === u._id || chat?.members[1] === u._id
            });
          }
          return !isChatCreated
        })
        setPotentialChats(pChats); 
      };

      fetchAllUsers();
    }, [userChats]);


    const updateCurrentChat = useCallback((chat) =>{
      setCurrentChat(chat);
    }, [])


    ///getMessages

    useEffect(() => {
      const getMessages = async () => {
        const res = await api.get(`/messages/${currentChat?._id}`);
        setMessages(res?.data?.message);
      };
      getMessages();
    }, [currentChat]);


    
    ///sendMessages
    const sendTextMessage = useCallback(async (text, senderID, chatID, setTextMessage) =>{
      if(!text) return alert('message can never be empty!')

      const res = await api.post('/messages', {text, senderID, chatID});
      setNewMessage(res?.data?.message)
      setMessages(((prev) => [...prev, res?.data?.message] ))
      setTextMessage("");
    }, [])



    const createChat = useCallback(async (firstID, secondID) =>{
      const res = await api.post('/chats', {firstID, secondID});
      setUserChats(((prev) => [...prev, res?.data?.newChat] ))
      console.log(res);
    }, [])



  ///Get User Chats
  useEffect(() => {
    const getUserChats = async () => {
     try {
      setUserChatsLoading(true)
      const res = await api.get(`/chats/${user?.id}`);
      setUserChats(res?.data?.chats); 
      setUserChatsLoading(false);
    } catch (error) {
       setUserChatsLoading(false)
       console.log(error);
     }
    };
    getUserChats();
  }, []);
    


    return (<chatContext.Provider value={{
      userChats,
      userChatsLoading,
      onlineUsers,
      potentialChats,
      currentChat,
      messages,
      updateCurrentChat,
      createChat,
      sendTextMessage
    }}>    
    {children}
    </chatContext.Provider>)
}


const useChatContext = () =>{
    return useContext(chatContext)
} 

export {useChatContext, ChatContextProvider}