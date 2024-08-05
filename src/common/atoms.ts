import { atom } from "jotai";

export const scriptTextAtom = atom("");
export const editorValueAtom = atom("");
export const openDirectoryAtom = atom<Record<string, boolean>>({});
export const activeFilePathAtom = atom("");
export const searchTextAtom = atom("");
export const showPreviewAtom = atom(false);
