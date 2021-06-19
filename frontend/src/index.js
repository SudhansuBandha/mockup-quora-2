import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "./context/user_account_context";
import { FormProvider } from "./context/form_vailadtor_context";
import { QuestionProvider } from "./context/questions_context";
import { AnswerProvider } from "./context/answers_context";
import { CommentsProvider } from "./context/comments_context";
import { ProfileProvider } from "./context/profile_context";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <FormProvider>
        <QuestionProvider>
          <AnswerProvider>
            <CommentsProvider>
              <ProfileProvider>
                {" "}
                <App />
              </ProfileProvider>
            </CommentsProvider>
          </AnswerProvider>
        </QuestionProvider>
      </FormProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
