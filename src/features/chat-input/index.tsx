import styles from './ChatInput.module.css';
import ModalFileUpload from '@/features/modal-file-upload';
import Arrow from '@/shared/assets/icons/arrow-top.svg?react';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { FormEvent, useState } from 'react';
import { Tooltip } from 'react-tooltip';

const ChatInput = () => {
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  console.log(files);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <button
        className={styles.button}
        type="button"
        data-tooltip-id="tooltip-add-file"
        data-tooltip-content={files.length ? 'Редактировать список файлов' : 'Прикрепить файлы'}
        onClick={() => setIsFileUploadOpen(true)}
      >
        <div className={styles.chipWrapper}>
          {!!files.length && <span>{files.length}</span>}
          <Clip />
        </div>
      </button>
      <Tooltip id="tooltip-add-file" />

      <input required placeholder="Введите сообщение для помощника" />

      <button className={styles.button} type="submit">
        <Arrow />
      </button>

      <ModalFileUpload
        files={files}
        open={isFileUploadOpen}
        onClose={() => setIsFileUploadOpen(false)}
        setFiles={setFiles}
      />
    </form>
  );
};

export default ChatInput;
