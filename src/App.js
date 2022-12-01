import React from "react";
import SplashScreen from "react-native-splash-screen";
import reducers from "./redux/reducers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import "react-native-gesture-handler";
import Routes from "./routes/Routes";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const store = createStore(
      persistedReducer,
      {},
      applyMiddleware(ReduxThunk)
    );
    let persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
