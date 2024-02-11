import ChatBox from "../../components/chatBox";
import ChatList from "../../components/chatList";
import Navbar from "../../components/navbar"
import { AccountContext } from "../../contexts/accountContext";
import { useChatContext } from "../../contexts/chatContext";
import './room.css';

function ChatRoom() {
    const {onlineUsers, userChats, potentialChats, createChat, updateCurrentChat} = useChatContext();
    const {user} = AccountContext();
    
    // console.log(potentialChats, userChats);
  return (
    <>
    <section className="room-section">
    <Navbar />

        <div className="room mt-5">
        <div className="container">
        <div className="row clearfix">
            <div className="col-lg-12">
                <div className="card chat-app">
                    <div id="plist" className="people-list bg-white">
                        <ul className="list-unstyled chat-list mt-2 mb-0">

                        {
                            userChats?.map((chat,i) =>{
                                return (
                                    <div key={i} onClick={() => updateCurrentChat(chat)}>
                                        <ChatList chat={chat} />
                                    </div>
                                )
                            })
                        }

                          {potentialChats.length > 0 && <li><strong>Start new chat with</strong></li>}

                          {
                            potentialChats?.map((chat,i) =>{
                                const isOnline = onlineUsers.some(item => item?.userID === chat?._id)
                                return (
                                    <li className="clearfix" key={i} onClick={() =>createChat(user.id, chat._id)}>
                                        <img src={"https://bootdey.com/img/Content/avatar/avatar"+(i+3)+".png"} alt="avatar" />
                                        <div className="test about">
                                            <div className="name">{chat?.username || 'N/A'}</div>
                                            <div className="status">
                                            <i className={`fa fa-circle ${isOnline ? 'online' : 'offline'}`}></i> {isOnline ? 'online' : 'offline'} </div>                                            
                                        </div>
                                    </li>
                                )
                            })
                          }   


                        </ul>
                    </div>
                          
                          <ChatBox />

                </div>
            </div>
        </div>  
        </div>
        </div>

    </section>
    </>
  )
}

export default ChatRoom
