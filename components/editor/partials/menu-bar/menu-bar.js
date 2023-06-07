import classNames from "classnames";
import * as Icons from "../icons";
import { useCallback } from "react";
import Button from "../../../button";

import styles from "./menu-bar.module.css";

const MenuBar = ({ editor, openModal }) => {
  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Button
        className="menu-button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Icons.RotateLeft />
      </Button>
      <Button
        className="menu-button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Icons.RotateRight />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("link"),
        })}
        onClick={openModal}
      >
        <Icons.Link />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("bold"),
        })}
        onClick={toggleBold}
      >
        <Icons.Bold />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("underline"),
        })}
        onClick={toggleUnderline}
      >
        <Icons.Underline />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("italic"),
        })}
        onClick={toggleItalic}
      >
        <Icons.Italic />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("strike"),
        })}
        onClick={toggleStrike}
      >
        <Icons.Strikethrough />
      </Button>
      <Button
        className={classNames("menu-button", {
          [styles.isActive]: editor.isActive("code"),
        })}
        onClick={toggleCode}
      >
        <Icons.Code />
      </Button>
    </div>
  );
};

export default MenuBar;
