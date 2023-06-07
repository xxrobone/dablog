import React from "react";
import * as Icons from "../icons";
import styles from "./link-modal.module.css";
import { Modal } from "@components/modal";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";

export function LinkModal({
  url = "",
  closeModal,
  onSaveLink,
  onChangeUrl,
  onRemoveLink,
  ...rest
}) {
  return (
    <Modal {...rest}>
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <h2>Edit link</h2>
          <Button
            className={styles.closeModal}
            type="button"
            onClick={closeModal}
          >
            <Icons.X />
          </Button>
        </div>

        <div className={styles.input}>
          <Label>URL</Label>
          <Input autoFocus value={url} onChange={onChangeUrl} />
        </div>
        <div className={styles.modalButtons}>
          <Button
            className={styles.modalButton}
            type="button"
            onClick={onRemoveLink}
          >
            Remove link
          </Button>
          <Button
            className={styles.modalButton}
            type="button"
            onClick={onSaveLink}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
