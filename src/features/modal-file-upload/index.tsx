import styles from './ModalFileUpload.module.css';
import Remove from '@/shared/assets/icons/close.svg?react';
import Button from '@/shared/ui/button';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

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
          <p>Перетащите файлы сюда или нажмите на эту область, чтобы выбрать файлы</p>
          <input type="file" multiple onChange={handleFileSelect} />
        </div>

        {innerFiles.length > 0 && (
          <div className={styles.fileList}>
            <h6>Загруженные файлы:</h6>
            <ul>
              {innerFiles.map((file, index) => (
                <li key={index}>
                  <button onClick={() => onDelete(file.name)}>
                    <Remove />
                  </button>
                  <span>{file.name}</span>
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
