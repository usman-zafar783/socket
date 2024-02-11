import { useEffect, useState } from "react";
import { AccountContext } from "../contexts/accountContext";
import api from "../_helpers/JWT_Interceptor";



const useFetchUser = (chat) =>{
    const [recipentUser, setRecipentUser] = useState(null);
    const {user} = AccountContext()
    const recipentID = chat?.members?.find(id => id !== user.id)
    useEffect(() => {
        const getUser = async () => {
          if (!recipentID) return;
    
          try {
            const result = await api.get(`/chats/find-user/${recipentID}`);
            setRecipentUser(result.data.result); 
          } catch (error) {
            console.error("Error fetching recipent user:", error);
          }
        };
        getUser();
      }, [recipentID]);

    return recipentUser;
}

export default useFetchUser;

