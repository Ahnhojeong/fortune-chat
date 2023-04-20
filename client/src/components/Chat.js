import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillSendFill } from "react-icons/bs";
import chatStyles from "../styles/Chat.module.css";
import Loader from "./Loader";
import {
  setAssistantMessages,
  setUserMessages,
  setAllMessages,
} from "../store/msgSlice";
import { transDate } from "../utils/common/Transfer";
let userMsg = [];
function Chat({ myDate }) {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");

  const messageBoxRef = useRef(null);

  const date = useSelector((state) => state.date.date);
  const allMessages = useSelector((state) => state.messages.allMessages);
  const assistantMessages = useSelector(
    (state) => state.messages.assistantMessages
  );

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const enterSendMsg = (e) => {
    if (e.target.value !== "" && e.keyCode === 13) {
      console.log("enterSendMsg --> ", inputVal);

      sendMsg();
    }
  };

  const sendMsg = () => {
    if (inputVal !== "") {
      userMsg.push(inputVal);

      dispatch(setUserMessages(inputVal));
      dispatch(setAllMessages(inputVal));
      setInputVal("");

      console.log("userMsg --> ", userMsg);
      
      fetch("http://localhost:8080/", {
        method: "POST",
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myDateTime: transDate(date.day, date.hour),
          userMessages: userMsg,
          assistantMessages: assistantMessages,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log("Chat response -> ", response);
          dispatch(setAssistantMessages(response.assistant));
          dispatch(setAllMessages(response.assistant));
        });
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current !== null) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div>
      <div className={chatStyles.messages} ref={messageBoxRef}>
        <div className={`${chatStyles.message} ${chatStyles.me}`}>
          오늘 나의 운세는 어때?
        </div>

        {/* <Loader /> */}
        {allMessages.length > 0 &&
          allMessages.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={index}
                  className={`${chatStyles.message} ${chatStyles.bot}`}
                >
                  {item}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`${chatStyles.message} ${chatStyles.me}`}
                >
                  {item}
                </div>
              );
            }
          })}
      </div>

      <div className={chatStyles.input_wrapper}>
        <input
          className={chatStyles.input_box}
          value={inputVal}
          onChange={handleChange}
          type="text"
          placeholder="질문을 입력하세요.."
          onKeyUp={enterSendMsg}
        />
        <button
          type="button"
          className={chatStyles.msg_submit_btn}
          onClick={sendMsg}
        >
          <BsFillSendFill />
        </button>
      </div>
    </div>
  );
}

export default Chat;
