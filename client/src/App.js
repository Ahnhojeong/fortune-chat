import "./App.css";
import layoutStyles from "./styles/Layout.module.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <div className={layoutStyles.chat_container}>
        <div className={layoutStyles.chat_title}>
          <h3>운세 보는 Chat-AI</h3>
          <p className={layoutStyles.introduction}>
            인공지능 AI가 당신의 미래를 예측합니다.
          </p>
          <img src={"image/fortune_avatar.jpeg"} alt="chat-ai" />
          <p className={layoutStyles.intro_message}>
            "자네.. 운세 한번 볼텐가?"
          </p>
        </div>
        <div className={layoutStyles.intro_question}>
          <label htmlFor="date" className={layoutStyles.label_title}>
            생년월일
          </label>
          <input id="date" type="date" name="date" />
          <label htmlFor="hour" className={layoutStyles.label_title}>
            태어난 시간
          </label>
          <select id="hour" name="hour">
            <option value="">모름</option>
            <option value="0">00</option>
            <option value="1">01</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
          </select>
          <button type="button" className={layoutStyles.start_btn}>
            시작하기
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default App;
