import * as S from "./styled";
import EmailEditor from "react-email-editor";
import sample from "../../example/sample.json";
import { useRef } from "react";

const Editor = ({ name = "Gabriel", otroname = "lacerda" }) => {
  const options = {
    mergeTags: {
      first_name: {
        name: "First Name",
        value: "{{first_name}}",
        sample: name,
      },
      last_name: {
        name: "Last Name",
        value: "{{last_name}}",
        sample: otroname,
      },
    },
  };
  const tools = {
    text: {
      properties: {
        text: {
          value: `<span style="font-size: 14px; line-height: 19.6px;">{{first_name}} {{last_name}}</span>`,
        },
      },
    },
    divider: {
      enabled: false,
    },
    heading: {
      enabled: false,
    },
    html: {
      enabled: false,
    },
    menu: {
      enabled: false,
    },
  };

  const emailEditorRef = useRef(null);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", design);
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
      alert("Output HTML has been logged in your developer console.");
    });
  };

  const onDesignLoad = (data) => {
    console.log("onDesignLoad", data);
  };

  const onLoad = () => {
    emailEditorRef.current.editor.addEventListener(
      "onDesignLoad",
      onDesignLoad
    );
    emailEditorRef.current.editor.loadDesign();
  };

  const testAPI = async () => {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  };

  return (
    <S.Container>
      <S.Bar>
        <h1>React Email Editor (Demo)</h1>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={testAPI}>Send Email</button>
      </S.Bar>
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
        minHeight="100vh"
        tools={tools}
        options={options}
        locale="pt-BR"
      />
    </S.Container>
  );
};

export default Editor;
