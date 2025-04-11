import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { useToast } from "../hooks/use-toast";

const Messages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/messages' } } });
    } else if (user.messages) {
      setMessages(user.messages);
      
      // Group messages by conversation
      const conversations = {};
      user.messages.forEach(msg => {
        const contactId = msg.from?.id;
        if (contactId && !conversations[contactId]) {
          conversations[contactId] = {
            contact: msg.from,
            messages: [msg],
            lastMessage: msg
          };
        } else if (contactId) {
          conversations[contactId].messages.push(msg);
          if (new Date(msg.timestamp) > new Date(conversations[contactId].lastMessage.timestamp)) {
            conversations[contactId].lastMessage = msg;
          }
        }
      });
      
      // If there are conversations, select the first one
      const conversationList = Object.values(conversations);
      if (conversationList.length > 0) {
        setSelectedConversation(conversationList[0]);
      }
    }
  }, [user, navigate]);
  
  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark messages as read
    if (conversation && conversation.messages) {
      const updatedMessages = messages.map(msg => {
        if (msg.from?.id === conversation.contact.id && !msg.isRead) {
          return { ...msg, isRead: true };
        }
        return msg;
      });
      setMessages(updatedMessages);
    }
  };
  
  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;
    
    setIsLoading(true);
    
    try {
      // Simulate sending message
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add new message to the conversation
      const newMsg = {
        id: Date.now(),
        to: selectedConversation.contact,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isRead: true,
        isSent: true
      };
      
      // Update messages state
      setMessages(prev => [...prev, newMsg]);
      
      // Update selected conversation
      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMsg],
        lastMessage: newMsg
      }));
      
      setNewMessage('');
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Group messages by conversation for the sidebar
  const conversationsMap = {};
  messages.forEach(msg => {
    const contactId = msg.from?.id;
    if (contactId && !conversationsMap[contactId]) {
      conversationsMap[contactId] = {
        contact: msg.from,
        messages: [msg],
        lastMessage: msg
      };
    } else if (contactId) {
      conversationsMap[contactId].messages.push(msg);
      if (new Date(msg.timestamp) > new Date(conversationsMap[contactId].lastMessage.timestamp)) {
        conversationsMap[contactId].lastMessage = msg;
      }
    }
  });
  
  const conversations = Object.values(conversationsMap).sort((a, b) => 
    new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
  );
  
  // Check if user has any messages
  const hasMessages = messages.length > 0;
  
  if (!user) {
    return null; // will redirect in useEffect
  }
  
  return (
    <>
      <Helmet>
        <title>Your Messages - PG Finder</title>
        <meta name="description" content="View and manage your conversations with landlords and property owners." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#484848] mb-6">Your Messages</h1>
        
        {hasMessages ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row h-[600px]">
              {/* Conversations Sidebar */}
              <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-[#484848]">Conversations</h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.contact.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedConversation?.contact.id === conversation.contact.id
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => selectConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img 
                            src={conversation.contact.avatar} 
                            alt={conversation.contact.name} 
                            className="w-10 h-10 rounded-full"
                          />
                          {conversation.contact.role === 'Landlord' && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00A699] rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-[#484848] truncate">
                              {conversation.contact.name}
                            </h3>
                            <span className="text-xs text-[#767676]">
                              {formatTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className={`text-xs truncate ${
                            !conversation.lastMessage.isRead ? 'font-semibold text-[#484848]' : 'text-[#767676]'
                          }`}>
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                      {!conversation.lastMessage.isRead && (
                        <div className="flex justify-end mt-1">
                          <span className="w-2 h-2 bg-[#FF5A5F] rounded-full"></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Area */}
              <div className="flex-1 flex flex-col h-full">
                {selectedConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                      <img 
                        src={selectedConversation.contact.avatar} 
                        alt={selectedConversation.contact.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-[#484848]">
                          {selectedConversation.contact.name}
                        </h3>
                        <p className="text-xs text-[#767676]">
                          {selectedConversation.contact.role}
                        </p>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {selectedConversation.messages.map((msg) => (
                        <div key={msg.id} className="flex flex-col">
                          <div className="text-xs text-center text-[#767676] mb-2">
                            {formatDate(msg.timestamp)}
                          </div>
                          <div className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              msg.isSent
                                ? 'bg-[#FF5A5F] text-white'
                                : 'bg-gray-100 text-[#484848]'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              <div className={`text-xs mt-1 text-right ${
                                msg.isSent ? 'text-white/80' : 'text-[#767676]'
                              }`}>
                                {formatTime(msg.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200">
                      <form onSubmit={sendMessage} className="flex items-end space-x-2">
                        <div className="flex-1">
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="resize-none"
                            rows={3}
                            disabled={isLoading}
                          />
                        </div>
                        <Button type="submit" disabled={!newMessage.trim() || isLoading}>
                          {isLoading ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fas fa-paper-plane"></i>
                          )}
                        </Button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl text-gray-300 mb-3">
                        <i className="far fa-comment-dots"></i>
                      </div>
                      <h3 className="text-lg font-medium text-[#484848] mb-1">No conversation selected</h3>
                      <p className="text-sm text-[#767676]">
                        Select a conversation from the list to view messages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="text-5xl text-gray-300 mb-4">
                <i className="far fa-comments"></i>
              </div>
              <h2 className="text-xl font-semibold text-[#484848] mb-2">No Messages Yet</h2>
              <p className="text-[#767676] max-w-md text-center mb-6">
                You don't have any messages yet. When you contact landlords or receive messages from them, they will appear here.
              </p>
              <Button onClick={() => navigate('/properties')}>
                Browse Properties
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default Messages;
