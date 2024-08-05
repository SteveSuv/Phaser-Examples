import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { editorValueAtom } from "~/common/atoms";

const divId = "phaser-example";
const scriptId = "phaser-example-script";

export const Preview = () => {
  const [editorValue] = useAtom(editorValueAtom);
  const ref = useRef<HTMLDivElement>(null);

  const removeDiv = () => {
    const oldD = document.getElementById(divId);
    oldD && ref.current?.removeChild(oldD);
  };

  const removeScript = () => {
    const oldS = document.getElementById(scriptId);
    oldS && document.body.removeChild(oldS);
  };

  const createDiv = () => {
    const d = document.createElement("div");
    d.setAttribute("id", divId);
    d.draggable = true;
    d.setAttribute("style", "height:100vh;position:fixed;bottom:0;right:0");
    ref.current?.appendChild(d);
  };

  const createScript = (str: string) => {
    const s = document.createElement("script");
    s.setAttribute("id", scriptId);
    s.innerHTML = "{" + str + "}";
    document.body.appendChild(s);
  };

  useEffect(() => {
    if (editorValue) {
      removeScript();
      removeDiv();
      createDiv();
      createScript(editorValue);
    }
  }, [editorValue]);

  return (
    <Draggable defaultClassNameDragging="opacity-50 transition-opacity">
      <div ref={ref} className="fixed right-0 bottom-0 z-10 cursor-move">
        <div className="absolute left-0 top-0 bg-white/20 cursor-pointer">
          close
        </div>
      </div>
    </Draggable>
  );
};
