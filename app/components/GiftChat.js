import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import Chatkit from "@pusher/chatkit";
import { bindActionCreators } from "redux";
import connect from 'react-redux/lib/connect/connect';
import { ActionCreators } from "../aRedux";
const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f5b5b315-25ca-47ef-a23e-bc490a4c8457/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:f5b5b315-25ca-47ef-a23e-bc490a4c8457";
//const CHATKIT_ROOM_ID = 17706666;
//const CHATKIT_USER_NAME = "u44"
class GiftChat extends React.Component {
    state = {
        messages: []
    };

    //   componentDidMount() {
    //     this.setState({
    //       messages: [
    //         {
    //           _id: 1,
    //           text: "سلام ، خوبی؟ امروز ساعت 8 جلسه داریم، زودتر بیا شرکت",
    //           createdAt: new Date(),
    //           user: {
    //             _id: 1,
    //             name: "سعید",
    //             avatar: "https://placeimg.com/140/140/any"
    //           }
    //         }
    //       ]
    //     });
    //   }
    onSend([message]) {
        this.currentUser.sendMessage({
            text: message.text,
            roomId: this.props.roomId ||17706666
        });
    }
    onReceive(data) {
        const { id, senderId, text, createdAt } = data;
        const incomingMessage = {
            _id: id,
            text: text,
            createdAt: new Date(createdAt),
            user: {
                _id: senderId,
                name: senderId,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
            }
        };
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, incomingMessage)
        }));
    }
    componentDidMount() {
        // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
        const tokenProvider = new Chatkit.TokenProvider({
            url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        });

        // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
        // For the purpose of this example we will use single room-user pair.
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: this.props.cUser.id,
            tokenProvider: tokenProvider
        });

        // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoom({
                roomId: this.props.roomId || 17706666,
                hooks: {
                    onNewMessage: this.onReceive.bind(this)
                }
            });
        });
    }
    render() {
        return <GiftedChat  messages={this.state.messages} onSend={messages => this.onSend(messages)} user={{_id:this.props.cUser.id}} />;
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
  }
  export default connect((state,props) => {
    return {
      cUser: state.cUser,
    }
  }, mapDispatchToProps)(GiftChat);