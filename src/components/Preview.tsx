import { useAtom } from "jotai";
import { Move, X } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { editorValueAtom } from "~/common/atoms";

const divId = "phaser-example";
const scriptId = "phaser-example-script";

export const Preview = () => {
  const [editorValue] = useAtom(editorValueAtom);
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

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
    ref.current?.appendChild(d);
  };

  const createScript = (str: string) => {
    const s = document.createElement("script");
    s.setAttribute("id", scriptId);
    s.innerHTML = "{" + str + "}";
    document.body.appendChild(s);
  };

  useLayoutEffect(() => {
    if (editorValue) {
      removeScript();
      removeDiv();
      createDiv();
      createScript(editorValue);
    }
  }, [editorValue]);

  if (!show) return null;

  return (
    <Draggable handle="strong">
      <div className="fixed right-0 bottom-0 z-10 bg-white">
        <div className="relative w-full h-full">
          <strong className="cursor-move absolute left-0 -top-10 w-full bg-white h-10 flex justify-between items-center">
            <div className="cursor-pointer hover:bg-indigo-500 transition-all">
              <Move className="w-10 h-10 p-2" />
            </div>
            <div
              className="cursor-pointer hover:bg-red-500 transition-all"
              onClick={() => {
                setShow(!show);
              }}
            >
              <X className="w-10 h-10 p-2" />
            </div>
          </strong>
          <div ref={ref} />
        </div>
      </div>
    </Draggable>
  );
};
