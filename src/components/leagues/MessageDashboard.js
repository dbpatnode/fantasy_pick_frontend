import React from 'react'
import SideBar from "./SideBar.js";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { useConversations } from '../contexts/ConversationsProvider'
import OpenConversation from './OpenConversation'

export default function MessageDashboard({user, league}) {
    const { selectedConversation } = useConversations()
  
    return (
        <div>
             {/* <ConversationsProvider league={league}> */}
          <SideBar user={user} league={league} />
          { selectedConversation && <OpenConversation />}
        {/* </ConversationsProvider> */}
        </div>
    )
}
