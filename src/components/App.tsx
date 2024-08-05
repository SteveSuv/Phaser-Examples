import { Preview } from "./Preview";
import { Menu } from "./Menu";
import { Editor } from "./Editor";

export const App = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Menu />
      <Editor />
      <Preview />
    </div>
  );
};
