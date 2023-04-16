import { useRef, useState, useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import chatStyles from "../styles/Chat.module.css";

function Chat() {
  const inputRef = useRef();
  const [userMsg, setUserMsg] = useState({});

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
        inputRef.current.value = "";
      } catch (err) {}
    }
  };

  useEffect(() => {
    console.log("userMsg ", userMsg);
  }, [userMsg]);

  return (
    <div style={{ display: "none" }}>
      <div className={chatStyles.messages}>
        {/* <div className={`${chatStyles.message} ${chatStyles.me}`}>hello</div>
        <div className={`${chatStyles.message} ${chatStyles.bot}`}>
          hello hellohellohellohellohellohellohello
        </div> */}
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
