import React, { useState, useEffect } from 'react';
import links from 'data/links';
import { SiteMetadata } from 'types';
import { useHistory } from 'react-router-dom';
import './chat.scss';
import firebase from "firebase/app";
import "firebase/database";
import Logo from 'images/svg/fc_logo.png';
import Profile from 'images/svg/profile-5.jpg';
import "firebase/auth";
import "firebase/firestore";
import config from "./../firebaseConfig";
import Cookies from 'universal-cookie';
import { animateScroll } from "react-scroll";
const siteMetadata = new SiteMetadata(
    'FlixChat',
    links.home,
    'Get Started',
    '/images/Favicon/favicon.png'
);



function Chat() {
    console.log('sdfvsd');
    let history = useHistory();
    const cookies = new Cookies();
    if (cookies.get('userToken') === undefined) {
        history.push('/');

    }
    let number = cookies.get('mobile');
    let [currentNumber, setCurrentNumber] = useState(number);
    let [currentToken, setCurrentToken] = useState(cookies.get('userToken'));
    let [recipents, setRecipents] = useState({});
    let [currentChats, setCurrentChats] = useState({});
    let [senderInfo, setSenderInfo] = useState({});
    let [recipentInfo, setRecipentInfo] = useState({});
    let [toPeople, setToPeople] = useState("");
    let [toPeopleName, setToPeopleName] = useState("");
    let [sentmsgToaddress, setSentmsgToaddress] = useState("");
    let [iddd, setIddd] = useState("");
    let [msg, setMsg] = useState('');
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const logout = () => {
        cookies.remove('userToken');
        cookies.remove('mobile');
        history.push('/');
    }

    useEffect(() => {
        firebase
            .database()
            .ref(
                // firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
                `users/` + number
            )
            .on("value", snapshot => {
                if (snapshot && snapshot.exists()) {
                    //Set values in state which can be extracted in jsx in render. 
                    setSenderInfo(snapshot.val());
                }
            })

        firebase
            .database()
            .ref(
                `inbox/` + number
            )
            .on("value", snapshot => {
                if (snapshot && snapshot.exists()) {
                    setRecipents(snapshot.val())
                    //Set values in state which can be extracted in jsx in render. 
                }
            })

    }, []);

    const getMessages = (key) => {
        setToPeople(key);
        firebase
            .database()
            .ref(
                // firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
                `users/` + key
            )
            .on("value", snapshot => {
                if (snapshot && snapshot.exists()) {

                    let moo = snapshot.val();
                    setToPeopleName(moo.name);
                }
            })
        let chatId = "chats/" + number + "-" + key
        let iddis = number + "-" + key;
        setIddd(iddis);
        firebase
            .database()
            .ref(
                // firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
                chatId
            )
            .on("value", snapshot => {
                setSentmsgToaddress(chatId);
                setIddd(iddis);
                if (snapshot && snapshot.exists()) {
                    setCurrentChats(snapshot.val());
                }
                else {
                    firebase
                        .database()
                        .ref(
                            // firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
                            'chats/' + key + "-" + number
                        )
                        .on("value", snapshot => {
                            setSentmsgToaddress('chats/' + key + "-" + number);
                            setIddd(iddis);
                            if (snapshot && snapshot.exists()) {
                                setCurrentChats(snapshot.val());
                            }

                        })
                }
            })

        firebase
            .database()
            .ref(
                // firebase_basepath + `${tenantId}/${userId}/task/product/${referenceId}`
                'users/' + key
            )
            .on("value", snapshot => {
                if (snapshot && snapshot.exists()) {
                    setRecipentInfo(snapshot.val());
                }
            })

    }

    const RecipentAll = () => (
        <div>
            {Object.keys(recipents).map(function (key) {
                let data = recipents[key];
                return <div className={`person row align-items-center ${toPeople === data['recipientId'] ? 'selected-chats' : ""}`} id={key} data-chat="person1" onClick={(e) => getMessages(key)} >
                    <div className="user">
                        <img src={data['recipientImage'] == "" ? Profile : data['recipientImage']} alt="Retail Admin" />
                        <span className="status"></span>
                    </div>
                    <p className={`name-time mb-0 ${toPeople === data['recipientId'] ? 'selected-chats' : ""}`}>
                        <span className={`name d-block ${toPeople === data['recipientId'] ? 'selected-chats' : ""}`}>{data['recipientName']}</span>
                        <span className="time">{key}</span>
                    </p>
                </div>

            })
            }
        </div>
    )

    const Messages = () => (
        <div>
            {Object.keys(currentChats).map(function (key) {

                var s = new Date(parseInt(currentChats[key].dateTimeStamp)).toUTCString();
                let data = currentChats[key];
                if (data.senderId == "+923162000072") {
                    return <li className="chat-right">

                        <div className="chat-text">{data.body}

                            <div className="chat-hour">{s} <span className="fa fa-check-circle"></span></div>
                        </div>
                        <div className="chat-avatar">
                            <img src={data.senderImage == "" ? Profile : data.senderImage} alt="Retail Admin" />
                            {/* <div className="chat-name">Jin</div> */}
                        </div>
                    </li>
                }
                else {
                    return <li className="chat-left">
                        <div className="chat-avatar">
                            <img src={data.senderImage == "" ? Profile : data.senderImage} alt="Retail Admin" />
                            {/* <div className="chat-name">Russell</div> */}
                        </div>
                        <div className="chat-text">{data.body}
                            <div className="chat-hour">{s} <span className="fa fa-check-circle"></span></div>
                        </div>

                    </li>
                }

            })
            }
        </div>
    )

    const SendMessage = () => {
        const msgSent = firebase.database().ref(sentmsgToaddress).push();
        const key = msgSent.key;
        msgSent.set({
            attachmentType: "6",
            body: msg,
            chatId: iddd,
            dateTimeStamp: new Date().getTime(),
            delivered: true,
            id: key,
            recipentId: recipentInfo.id,
            recipientImage: recipentInfo.image,
            recipientName: recipentInfo.name,
            recipientStatus: recipentInfo.status,
            selected: "false",
            senderId: senderInfo.id,
            senderImage: senderInfo.image,
            senderName: senderInfo.name,
            senderStatus: senderInfo.status,
            sent: true,
            seen: true,
            timeDiff: "0 second ago"

        }, (error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log(firebase.database().ref(sentmsgToaddress).push().key)
                // Success
            }
        });

        setMsg('');
        setTimeout(
            () => animateScroll.scrollToBottom({
                containerId: "scroll-to-bottom"
            }),
            1000
        )
    }
    const onBlur = (e) => {
        setMsg(e.target.value);
    }
    setTimeout(
        () => animateScroll.scrollToBottom({
            containerId: "scroll-to-bottom"
        }),
        1000
    )

    return (
        <div className="w-100 h-100" style={{ backgroundColor: "#004976" }}>
            <div className="content-wrapper" style={{ backgroundColor: "#004976" }}>

                <div className="row gutters" style={{ backgroundColor: "#004976" }}>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ backgroundColor: "#004976" }}>

                        <div className="card m-0" style={{ backgroundColor: "#004976" }}>
                            <div className="row no-gutters justify-content-center" style={{ height: "100vh" }}>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3" style={{ maxWidth: 300 }}>
                                    <div className="users-container">

                                        <img src={Logo} className="mb-2 mx-auto" style={{ width: 88 }} />
                                        <div className="chat-search-box boder-top" style={{ borderTop: "6px solid #ffffff" }}>
                                        </div>
                                        <div className="users">
                                            {
                                                Object.keys(recipents).length > 0 ? <RecipentAll /> : <div className="text-white font-weight-bold">You do not started any chat yet! Please go to your flixchat app and start a conversation!</div>
                                            }

                                        </div>
                                        <div className="w-100 log-out font-weight-bold text-center cursor-pointer border-top align-items-center " onClick={() => logout()} style={{ lineHeight: "40px" }}>Logout</div>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9" style={{ backgroundColor: "#004976" }}>
                                    <div className="selected-user">
                                        {toPeopleName !== "" ?
                                            <span>To: <span className="name">{toPeopleName}</span></span> : ""
                                        }
                                    </div>
                                    <div className="chat-container">
                                        {Object.keys(currentChats).length > 0 ?
                                            <ul className="chat-box chatContainerScroll chat-inner" id="scroll-to-bottom">

                                                {
                                                    Object.keys(currentChats).length > 0 && <Messages />
                                                }
                                            </ul> : <ul className="chat-box chatContainerScroll chat-inner row text-align-center"><div className="mx-auto position-absolute row w-50 text-align-center justify-content-centter text-white font-weight-bold" style={{ top: "50%", height: 100, left: "10%", right: "10%" }}>

                                                <div style={{ fontSize: 26 }}>Select a Conversation</div>
                                  Try selecting a conversation to start chatting.</div></ul>
                                        }
                                        {Object.keys(currentChats).length > 0 &&
                                            <div>
                                                <div className="form-group mt-3 mb-0">
                                                    <textarea className="form-control" value={msg} onChange={e => onBlur(e)} rows="3" placeholder="Type your message here..."></textarea>
                                                </div>
                                                <button onClick={() => SendMessage()} className="chat-button btn btn-dark mt-1 mr-2 float-right bg-white text-dark">Send</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default Chat;
