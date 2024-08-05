import axios from "axios";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
  activeFilePathAtom,
  openDirectoryAtom,
  scriptTextAtom,
  searchTextAtom,
} from "~/common/atoms";
import { fileMap } from "~/common/fileMap";

const FileItem = ({
  filePath,
  directoryPath,
}: {
  filePath: string;
  directoryPath: string;
}) => {
  const [activeFilePath, setActiveFilePath] = useAtom(activeFilePathAtom);
  const [_, setScriptText] = useAtom(scriptTextAtom);
  const [searchText] = useAtom(searchTextAtom);

  useEffect(() => {
    if (activeFilePath) {
      axios.get(activeFilePath).then((res) => {
        setScriptText(res.data || "");
      });
    }
  }, [activeFilePath]);

  const fullPath = `${directoryPath}/${filePath}`;

  if (!fullPath.toLowerCase().includes(searchText)) {
    return null;
  }

  return (
    <div
      key={fullPath}
      className="py-2 px-4 hover:bg-indigo-100 cursor-pointer font-Merriweather flex flex-col gap-2 text-lg"
      onClick={() => {
        setActiveFilePath(fullPath);
      }}
    >
      <img
        className="w-1/2"
        onError={(e: any) => {
          e.target.style.display = "none";
        }}
        src={fullPath
          .replace("./examples/", "./screenshots/")
          .replace(".js", ".png")
          .toLowerCase()}
      />
      {filePath}
    </div>
  );
};

const DirectoryItem = ({
  filePath,
  directoryPath,
}: {
  filePath: string;
  directoryPath: string;
}) => {
  const fullPath = `${directoryPath}/${filePath}`;
  const [openDirectory, setOpenDirectory] = useAtom(openDirectoryAtom);
  const level = fullPath.split("/").length - 3;
  const isTopLevel = level === 0;
  const isOpen = openDirectory[fullPath];

  return (
    <div
      key={fullPath}
      style={{ marginLeft: level * 20 }}
      className={clsx("border-l", !isTopLevel && "border-indigo-500")}
    >
      <div
        className="text-2xl font-bold px-4 py-2 hover:bg-indigo-200 cursor-pointer font-Merriweather"
        onClick={() => {
          setOpenDirectory({ ...openDirectory, [fullPath]: !isOpen });
        }}
      >
        {filePath}
      </div>
      {isOpen && <MenuList directoryPath={fullPath} />}
    </div>
  );
};

const MenuList = ({ directoryPath }: { directoryPath: string }) => {
  const menus = fileMap[directoryPath] || [];

  if (!menus.length) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {menus.map((filePath) => {
        if (filePath.endsWith(".js")) {
          return <FileItem filePath={filePath} directoryPath={directoryPath} />;
        }

        return (
          <DirectoryItem filePath={filePath} directoryPath={directoryPath} />
        );
      })}
    </div>
  );
};

const Search = () => {
  const [searchText, setSearchText] = useAtom(searchTextAtom);

  return (
    <input
      className="border-b-2 transition-all bg-gray-100 w-full focus:bg-white focus:border-indigo-500 text-xl py-3 px-4  outline-none"
      placeholder="Search"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value.trim().toLowerCase())}
    />
  );
};

export const Menu = () => {
  return (
    <div className="w-[400px] h-screen overflow-auto border-r-8 border-indigo-400">
      <Search />
      <MenuList directoryPath="./examples" />
    </div>
  );
};
