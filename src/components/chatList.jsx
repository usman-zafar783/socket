
import { useChatContext } from '../contexts/chatContext';
import useFetchUser from '../hooks/useFetchRecipent';
import '../pages/ChatRoom/room.css';


function ChatList({chat}) {

    const recipentUser = useFetchUser(chat);
    const {onlineUsers} = useChatContext();

    let isOnline = onlineUsers?.some(u => u?.userID === recipentUser?._id)

  return (
    <>
      
      <li className=" clearfix">
        <img src={"https://bootdey.com/img/Content/avatar/avatar"+1+".png"} alt="avatar" />
        {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" class="avatar-img"/> */}

        <div className="about">
            <div className="name">{recipentUser?.username || 'N/A'}</div>
            <div className="status">
            {/* <i className={`fa fa-circle ${onlineUsers.some(item => item.userID === recipentUser._id) ? 'online' : 'offline'}`}></i> left 7 mins ago </div>                                             */}
            <i className={`fa fa-circle  ${isOnline? 'online': 'offline'}`}></i> {isOnline ? 'online' : 'offline'} </div>                                            
        </div>
      </li>

    </>
  )
}

export default ChatList
