import React, { Component } from "react";
import ReactDOM from "react-dom";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

import { Provider } from "react-redux";

import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import ReduxToastr, { toastr } from "react-redux-toastr";
import axios from "axios";

const reducers = {
  toastr: toastrReducer
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

const ajaxCall = () => {
  axios.get("http://localhost:8080/greeting").then(json => {
    console.log(json.data.id);
    const id=json.data.id;
    console.log(id);
    toastr.success("Data Updated in Database Proposal ID is "+id);
  });
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <button
            type="button"
            onClick={() => {
              ajaxCall();
            }}
          >
             Update Proposal
          </button>

       

          <ReduxToastr
            timeOut={3000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </div>
      </Provider>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
