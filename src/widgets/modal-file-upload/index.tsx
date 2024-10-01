import styles from './ModalFileUpload.module.css';
import { useUploadFileMutation } from '@/app/api';
import { FileUploaded } from '@/app/api/types/chat.ts';
import ListUploadedFiles from '@/features/list-uploaded-files';
import { isValidFileType, validFileTypes } from '@/features/list-uploaded-files/utils';
import FileIcon from '@/shared/assets/icons/upload-file.svg?react';
import { TOAST_ERROR, TOAST_INFO, TOAST_SUCCESS } from '@/shared/constants/toasts.ts';
import Button from '@/shared/ui/button';
import { ModalGeneral } from '@/shared/ui/modal-general';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

type Props = {
  open: boolean;
  onClose: () => void;
  files: FileUploaded[];
  setFiles: Dispatch<SetStateAction<FileUploaded[]>>;
};

const maxFile = { name: '100 MB', value: 100000000 };

const ModalFileUpload = ({ open, onClose, files, setFiles }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [innerFiles, setInnerFiles] = useState<File[]>([]);
  const [upload] = useUploadFileMutation();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = (files: File[]) => {
    const promises = [];
    setIsLoading(true);
    for (const elem of files) {
      promises.push(upload({ chat_id: Number(chatId), file: elem }).unwrap());
    }
    Promise.all(promises)
      .then((res) => {
        setFiles((prev) => [
          ...prev,
          // тут добавляем тип файла к типу FileUploaded, чтобы в чате понимать какого типа файл
          ...res.map((file, idx) => ({ ...file, data: { ...file.data, type: files[idx].type } })),
        ]);
        onClose();
        TOAST_SUCCESS('Файлы успешно добавлены, напишите тело сообщения');
      })
      .catch(() => {
        TOAST_ERROR('Ошибка загрузки файлов, обратитесь в поддержку');
      })
      .finally(() => setIsLoading(false));
  };

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

  const onSave = () => {
    if (innerFiles.some((elem) => elem.size >= maxFile.value || !isValidFileType(elem))) {
      TOAST_INFO('Один или несколько ваших файлов не подходят по критериям (вес или формат), мы удалили их из списка');
    }
    const filteredFiles = innerFiles.filter((elem) => {
      // если файл не проходит по типу или весу или он уже был загружен то скипаем его
      return !(
        elem.size >= maxFile.value ||
        !isValidFileType(elem) ||
        files.some((file) => file.data.name === elem.name)
      );
    });
    onUpload(filteredFiles);
  };

  useEffect(() => {
    // TODO:FIX: пока что такой косталь чтобы чистить тут файлы после того как сообщение отправили
    if (!files.length) {
      setInnerFiles([]);
    }
  }, [files]);

  return (
    <ModalGeneral open={open} onClose={onClose} title="Добавить файлы">
      <div className={styles.wrapper}>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          className={`${styles.drop} ${isDragging ? styles.isDrag : ''}`}
          data-tooltip-id="tooltip-file-types"
          data-tooltip-content={'Разрешенные форматы файлов: ' + validFileTypes.join(', ')}
        >
          <FileIcon />
          <div>
            <h5>Выберите или перетащите файл</h5>
            <small>Максимальный размер файла {maxFile.name}</small>
          </div>
          <input type="file" multiple onChange={handleFileSelect} />
          <Tooltip id="tooltip-file-types" className={styles.tooltip} />
        </div>

        <ListUploadedFiles
          chatId={chatId}
          setInnerFiles={setInnerFiles}
          uploadedFiles={files}
          setUploadedFiles={setFiles}
          files={innerFiles}
          maxFile={maxFile}
        />

        <footer>
          <Button variant="outlined" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave} disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Сохранить'}
          </Button>
        </footer>
      </div>
    </ModalGeneral>
  );
};

export default ModalFileUpload;
