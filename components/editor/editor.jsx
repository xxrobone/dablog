import React, { useCallback, useState } from "react";
import classNames from "classnames";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";

import { LinkModal } from "./partials/link-modal/link-modal";
import MenuBar from "./partials/menu-bar/menu-bar";
import styles from "./editor.module.css";
import Button from "../button";

export default function Editor({ className, onChange, content }) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content,
    onUpdate: ({ editor }) => {
      if (typeof onChange === "function") {
        const editorContent = editor.getHTML();
        onChange(editorContent);
      }
    },
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  if (!editor) {
    return null;
  }

  return (
    <div className={classNames(className, "editor")}>
      <MenuBar editor={editor} openModal={openModal} />
      <BubbleMenu
        className="bubble-menu-light"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <div className={styles.bubbleMenu}>
          <Button onClick={openModal}>Edit</Button>
          <Button onClick={removeLink}>Remove</Button>
        </div>
      </BubbleMenu>

      <EditorContent className={styles.editorContent} editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  );
}
