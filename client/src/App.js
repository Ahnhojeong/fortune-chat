import "./App.css";
import Layout from "./components/Layout";
import IntroForture from "./components/IntroFortune";

import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <IntroForture />
      </Layout>
    </Provider>
  );
}

export default App;
