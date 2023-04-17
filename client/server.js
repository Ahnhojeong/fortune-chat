const apiKey = "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";
const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

// CORS 이슈 해결
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "/build")));

app.get("/", (res, req) => {
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("*", (res, req) => {
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

// POST 요청 받을 수 있도록 함
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post("/", async function (req, res) {
  console.log("req.body", req.body);
  let { myDateTime, userMessages, assistantMessages } = req.body;

  let todayDateTime = new Date().toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  let messages = [
    {
      role: "system",
      content:
        "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
    },
    {
      role: "user",
      content:
        "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.",
    },
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 챗도지입니다. 운세와 점성술에 관한 질문이 있으신가요? 어떤 것이든 물어보세요, 최선을 다해 답변해 드리겠습니다.",
    },
    {
      role: "user",
      content: `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다.`,
    },
    {
      role: "assistant",
      content: `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것과 오늘은 ${todayDateTime}인 것을 확인했습니다. 운세에 대해서 어떤 것이든 물어보세요!`,
    },
  ];

  // while (userMessages.length != 0 || assistantMessages.length != 0) {
  //   if (userMessages.length != 0) {
  //     messages.push(
  //       JSON.parse(
  //         '{"role": "user", "content": "' +
  //           String(userMessages.shift()).replace(/\n/g, "") +
  //           '"}'
  //       )
  //     );
  //   }
  //   if (assistantMessages.length != 0) {
  //     messages.push(
  //       JSON.parse(
  //         '{"role": "assistant", "content": "' +
  //           String(assistantMessages.shift()).replace(/\n/g, "") +
  //           '"}'
  //       )
  //     );
  //   }
  // }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  let fortune = completion.data.choices[0].message["content"];
  console.log(fortune);
  res.json({ assistant: fortune });
  // res.send(fortune);
});

http.listen(8080, () => {
  console.log("Listening on 8080");
});