import clsx from "clsx";
import { useAtom } from "jotai";
import { Move, X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import Draggable from "react-draggable";
import { editorValueAtom, showPreviewAtom } from "~/common/atoms";

const divId = "phaser-example";
const scriptId = "phaser-example-script";

export const Preview = () => {
  const [editorValue] = useAtom(editorValueAtom);
  const ref = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useAtom(showPreviewAtom);

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

  return (
    <Draggable handle="strong">
      <div
        className={clsx(
          "fixed right-0 bottom-0 bg-white",
          showPreview ? "z-10" : "-z-10",
        )}
      >
        <div className="relative w-full h-full">
          <div className="absolute left-0 -top-10 w-full bg-white h-10 flex justify-between items-center">
            <strong className="flex flex-1 cursor-move">
              <Move className="w-10 h-10 p-2" />
            </strong>
            <div
              className="cursor-pointer hover:bg-red-500 transition-all"
              onClick={() => {
                setShowPreview(false);
              }}
            >
              <X className="w-10 h-10 p-2" />
            </div>
          </div>
          <div ref={ref} />
        </div>
      </div>
    </Draggable>
  );
};
