import Header from "./components/Header";
import "./App.css";
import Body from "./components/Body";
import store from "./components/utills/store"
import { Provider } from "react-redux";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div >
          <Header />
          <Body />
        </div>
      </Provider>
    </>
  )
}

export default App