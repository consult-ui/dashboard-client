import styles from './ModalFileUpload.module.css';
import { convertFileSize } from '@/features/modal-file-upload/utils';
import Remove from '@/shared/assets/icons/delete.svg?react';
import List from '@/shared/assets/icons/list.svg?react';
import FileIcon from '@/shared/assets/icons/upload-file.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const maxFile = { name: '100 MB', value: 100000000 };

const ModalFileUpload = ({ open, onClose, files, setFiles }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [innerFiles, setInnerFiles] = useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setInnerFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as Iterable<File>);
    setInnerFiles((prev) => [...prev, ...selectedFiles]);
  };

  const onDelete = (fileName: string) => {
    setInnerFiles((prev) => [...prev.filter((elem) => elem.name !== fileName)]);
  };

  const onSave = () => {
    if (innerFiles.some((elem) => elem.size >= maxFile.value)) {
      TOAST_ERROR(`Один или несколько ваших файлов превышают лимит по весу (${maxFile.name}), удалите их из списка.`);
      return;
    }
    setFiles(innerFiles);
    onClose();
  };

  useEffect(() => {
    setInnerFiles(files);
  }, [files]);

  return (
    <ModalGeneral open={open} onClose={onClose} title="Добавить файлы">
      <div className={styles.wrapper}>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={`${styles.drop} ${isDragging ? styles.isDrag : ''}`}
        >
          <FileIcon />
          <div>
            <h5>Выберите или перетащите файл</h5>
            <small>Максимальный размер файла {maxFile.name}</small>
          </div>
          <input type="file" multiple onChange={handleFileSelect} />
        </div>

        {innerFiles.length > 0 && (
          <div className={styles.fileList}>
            <h6>Загруженные файлы:</h6>
            <ul>
              {innerFiles.map((file, index) => (
                <li key={index} className={`${styles.file} ${file.size > maxFile.value ? styles.error : ''}`}>
                  <div>
                    <List />
                    <small>{file.name}</small>
                    <small className={`${styles.size} ${file.size > maxFile.value ? styles.error : ''}`}>
                      {convertFileSize(file)}
                    </small>
                  </div>
                  <button title="Удалить файл из списка" onClick={() => onDelete(file.name)}>
                    <Remove />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <footer>
          <Button variant="outlined" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave}>Сохранить</Button>
        </footer>
      </div>
    </ModalGeneral>
  );
};

export default ModalFileUpload;
