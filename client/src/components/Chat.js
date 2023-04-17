import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BsFillSendFill } from "react-icons/bs";
import chatStyles from "../styles/Chat.module.css";
import Loader from './Loader';

function Chat() {
  const inputRef = useRef();
  const [userMsg, setUserMsg] = useState({});
  const date = useSelector((state) => state.date.date);

  const sendMsg = async (e) => {
    if (inputRef.current.value) {
      try {
        console.log("sendMsg");
        setUserMsg({
          ...userMsg,
          [Date.now()]: {
            id: Date.now(),
            msg: inputRef.current.value,
          },
        });

        const response = await fetch('http://localhost:8080/', {
          method: 'POST',
          headers: {
              // 'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              myDateTime: date.day,
              userMessages: "안녕하세요?",
              assistantMessages: [],
          })
      });

      const data = await response.json();
      console.log("data res --> ", data)


        inputRef.current.value = "";
      } catch (err) {}
    }
  };

  return (
    <div>
      <div className={chatStyles.messages}>
        <div className={`${chatStyles.message} ${chatStyles.me}`}>오늘 나의 운세는 어때?</div>
        {/* <div className={`${chatStyles.message} ${chatStyles.bot}`}>
          hello hellohellohellohellohellohellohello
        </div> */}
        <Loader />
        {Object.keys(userMsg).length > 0 &&
          Object.values(userMsg).map((item) => {
            return (
              <div
                key={item.id}
                className={`${chatStyles.message} ${chatStyles.me}`}
              >
                {item.msg}
              </div>
            );
          })}
      </div>

      <div className={chatStyles.input_wrapper}>
        <input
          ref={inputRef}
          className={chatStyles.input_box}
          type="text"
          placeholder="질문을 입력하세요.."
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
