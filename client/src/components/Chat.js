import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillSendFill } from "react-icons/bs";
import chatStyles from "../styles/Chat.module.css";
import Loader from "./Loader";
import {
  setUserMessages,
  setAllMessages,
  postMessages,
  getMessagesStatus,
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
  const status = useSelector(getMessagesStatus);

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

      dispatch(
        postMessages({
          myDateTime: transDate(date.day, date.hour),
          userMessages: userMsg,
          assistantMessages: assistantMessages,
        })
      );
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
        {status === "loading" && <Loader />}
      </div>

      <div className={chatStyles.input_wrapper}>
        <input
          className={chatStyles.input_box}
          value={inputVal}
          onChange={handleChange}
          type="text"
          placeholder="질문을 입력하세요.."
          onKeyUp={enterSendMsg}
          disabled={status === "loading" ? true : false}
        />
        <button
          type="button"
          className={chatStyles.msg_submit_btn}
          style={{ filter: status === "loading" ? "grayscale(1)" : "none" }}
          onClick={sendMsg}
        >
          <BsFillSendFill />
        </button>
      </div>
    </div>
  );
}

export default Chat;
