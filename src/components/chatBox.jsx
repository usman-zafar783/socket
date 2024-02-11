
import { useEffect, useRef, useState } from 'react';
import { AccountContext } from '../contexts/accountContext';
import { useChatContext } from '../contexts/chatContext';
import useFetchUser from '../hooks/useFetchRecipent';
import '../pages/ChatRoom/room.css';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';


function ChatBox() {

    const {currentChat, messages, sendTextMessage, onlineUsers} = useChatContext()
    const {user} = AccountContext()

    const recipentUser = useFetchUser(currentChat);
    const [textMessage, setTextMessage] = useState('');
    
    const isOnline = onlineUsers?.some(u => u?.userID === recipentUser?._id);
    
    const scroll = useRef()
    useEffect(() => {
        scroll.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])


    if(!recipentUser){
       return ( <div className="text-center chat"><div className="chat-header clearfix">
                    No conversation selected yet!
                </div>
            </div> )    
    }
    

  return (
    <>
       <div className="chat" ref = {scroll}>
                        <div className="chat-header clearfix">
                            <div className="row">
                                <div className="col-lg-6">
                                    <a href="#" data-toggle="modal" data-target="#view_info">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                    </a>
                                    <div className="chat-about">
                                        <h6 className="m-b-0">{recipentUser?.username}</h6>
                                        <small>{isOnline ? 'Online' : 'Offline'}</small>
                                    </div>
                                </div>
                                <div className="col-lg-6 hidden-sm text-end">
                                    <a href="#" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                                    <a href="#" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                                    <a href="#" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                                    <a href="#" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                                </div>
                            </div>
                        </div>

                        
                        <div className="chat-history" ref = {scroll}>
                            <ul className="m-b-0">
                                {
                                   messages && messages?.map((msg, i) =>{
                                        return(
                                            <li className="clearfix" key={i}>
                                                <div className={`message-data ${user.id===msg.senderID? 'text-end':''}`}>
                                                    <span className="message-data-time">{moment(msg.createdAt).fromNow()}, Today</span>
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                                </div>
                                                <div className={`message ${user.id===msg.senderID ? 'other-message float-right':  'my-message'}`}> {msg?.text}</div>
                                            </li>
                                        )
                                    } )
                                }
                                {
                                     messages.length === 0 && <div className="text-center">Start a new conversation</div>
                                }
                            </ul>
                        </div>
                        <div className="chat-message clearfix">
                            <div className="input-group mb-0 flex-nowrap">
                                <div className="input-group-prepend" onClick={() => sendTextMessage(textMessage, user.id, currentChat._id, setTextMessage)}>
                                    <span className="input-group-text h-100"><i className="fa-regular fa-paper-plane"></i></span>
                                </div>
                                <InputEmoji type="text" className="form-control" placeholder="Enter text here..." 
                                value={textMessage}
                                onChange={setTextMessage}
                                />                                    
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default ChatBox
