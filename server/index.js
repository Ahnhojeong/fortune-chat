const apiKey = "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";
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function apiCall(){
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: "Hello world"}],
      });
      console.log(completion.data.choices[0].message);
}

apiCall();