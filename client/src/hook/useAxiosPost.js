import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAssistantMessages, setAllMessages } from "../store/msgSlice";

function useAxiosPost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const postMsg = async (myDate, userMsg, assistantMsg) => {
    try {
      const res = await axios({
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://localhost:8080/",
        data: {
          myDateTime: myDate,
          userMessages: userMsg,
          assistantMessages: assistantMsg,
        },
      });
      console.log("useAxiosPost postMsg res -> ", res);
      if (res.statusText === "OK" || res.statusText === "Created") {
        dispatch(setAssistantMessages(res.data.assistant));
        dispatch(setAllMessages(res.data.assistant));

        return res.statusText;
      } else {
        console.log("res.status --> ", res.status);

        return res.status;
      }
    } catch (err) {
      console.error("useAxiosPost postMsg err -> ", err);
    }
    setLoading(false);
  };

  return { postMsg, loading };
}

export default useAxiosPost;
