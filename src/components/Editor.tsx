import MonacoEditor from "@monaco-editor/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { editorValueAtom, scriptTextAtom } from "~/common/atoms";

export const Editor = () => {
  const [scriptText] = useAtom(scriptTextAtom);
  const [editorValue, setEditorValue] = useAtom(editorValueAtom);

  useEffect(() => {
    setEditorValue(scriptText);
  }, [scriptText]);

  return (
    <MonacoEditor
      theme="vs-dark"
      height="100vh"
      language="javascript"
      value={editorValue}
      onChange={(value) => {
        setEditorValue(value || "");
      }}
      onMount={(_, monaco) => {
        const libraryDef = `declare module 'Phaser'`;
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          libraryDef,
          "file:///node_modules/phaser/types/index.d.ts",
        );
      }}
      options={{
        fontSize: 14,
        padding: { top: 10, bottom: 10 },
        minimap: { enabled: false },
      }}
    />
  );
};
