import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton, Avatar } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";


const Sidebar = () => {


  const API_URL = "http://localhost:9000/api/v1/users/";

  const { user: data } = useSelector((state) => state.auth);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function fechConversations() {
      try{
        const response = await axios.get(`${API_URL}${data.user.id}/conversations`);
        setConversations(response.data);
      }catch(error){
        console.log(error);
      }
    }
    fechConversations();
  }, [data.user.id]);



  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={data.user.profile_image} />
        <div>
          <p><span>{data.user.firstname}</span><span>{data.user.lastname}</span></p>
          <p><span>{data.user.email}</span></p>
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Busca o inicia un nuevo chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        {conversations.map(conversation => <SidebarChat  conversation={conversation} />)}
      </div>
    </div>
  );
};

export default Sidebar;
