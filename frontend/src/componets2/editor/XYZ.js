import React, { useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./editor.css";
import ReactRoundedImage from "react-rounded-image";
import { useUserContext } from "../../context/user_account_context";
import { useAnswerContext } from "../../context/answers_context";

function XYZ(props) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(props.text))
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const { userState } = useUserContext();

  const { editAnswer, answer_refresh, answerTrigger, setAnswerTrigger } =
    useAnswerContext();

  let state = {
    editorState: editorState,
  };

  const Close = () => {
    props.onClose();
    answer_refresh();
  };
  const onSubmit = () => {
    const answer = state.editorState.getCurrentContent().getPlainText();
    const id = props.id;

    editAnswer({ answer, id });
    Close();
    setAnswerTrigger(!answerTrigger);
  };
  return (
    <div className="editor">
      <div className="user-profile">
        <div>
          <ReactRoundedImage
            image={userState.profile.profilepic}
            imageWidth="45"
            imageHeight="45"
            roundedSize="0"
          />
        </div>
        <div className="user-details">
          <div className="second-flex">
            <p className="black">{userState.profile.username}</p>
          </div>
          <div>
            <p className="details-description">
              {userState.profile.description}
            </p>
          </div>
        </div>
      </div>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ["inline", "list", "textAlign", "link", "emoji", "image"],
          inline: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            options: ["bold", "italic", "underline"],
          },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: false, options: ["link"] },
        }}
      />
      <div className="editor-bottom">
        <div className="editor-bottom-submit" onClick={(e) => onSubmit()}>
          Submit
        </div>
        <div
          className="editor-bottom-cancel"
          onClick={(e) => {
            Close();
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}

export default XYZ;
