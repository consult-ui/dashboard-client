import styles from './ListUploadedFiles.module.css';
import { useDeleteFileMutation } from '@/app/api';
import { FileUploaded } from '@/app/api/types/chat.ts';
import { convertFileSize, isValidFileType } from '@/features/list-uploaded-files/utils';
import Remove from '@/shared/assets/icons/delete.svg?react';
import List from '@/shared/assets/icons/list.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import { Dispatch, SetStateAction, useState } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  files: File[];
  uploadedFiles: FileUploaded[];
  maxFile: { name: string; value: number };
  setInnerFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedFiles: Dispatch<SetStateAction<FileUploaded[]>>;
  chatId: string | undefined;
};

const ListUploadedFiles = (props: Props) => {
  const { chatId, files, uploadedFiles, maxFile, setInnerFiles, setUploadedFiles } = props;
  const [deleteFile] = useDeleteFileMutation();
  const [loadingName, setLoadingName] = useState<null | string>(null);

  if (!files?.length) return;

  const isInvalid = (file: File): boolean | 'size' | 'type' => {
    if (file.size > maxFile.value) return 'size';
    if (!isValidFileType(file)) return 'type';
    return false;
  };

  const onDelete = (fileName: string) => {
    setInnerFiles((prev) => [...prev.filter((elem) => elem.name !== fileName)]);
  };

  const onDeleteUploaded = (fileId: string | undefined, fileName: string) => {
    if (!fileId) {
      onDelete(fileName);
      return;
    }
    setLoadingName(fileName);
    deleteFile({ chat_id: Number(chatId as string), file_id: fileId })
      .unwrap()
      .then((res) => {
        if (res.success) {
          // удаляем файл из файлов в модалке
          setInnerFiles((prev) => [...prev.filter((elem) => elem.name !== fileName)]);
          // удаляем файл из самого инпута (из загруженных файлов)
          setUploadedFiles((prev) => [...prev.filter((elem) => elem.data.id !== fileId)]);
        } else {
          throw new Error(res.msg);
        }
      })
      .catch((err) => TOAST_ERROR(err?.message || 'Ошибка удаления файла'))
      .finally(() => setLoadingName(null));
  };

  return (
    <div className={styles.fileList}>
      <h6>Загруженные файлы:</h6>
      <small>
        Если в списке, есть файлы, которые не подходят по критериям загрузки, они <span>не будут загружены</span> в
        сообщение! Такие файлы имеют красный текст.
      </small>
      <Tooltip className={styles.tooltip} id="tooltip-file" />

      <ul>
        {files.map((file, index) => {
          const isUploaded = uploadedFiles.some((elem) => elem.data.name === file.name);
          const fileId = uploadedFiles.find((elem) => elem.data.name === file.name)?.data.id;
          const invalidType = isInvalid(file) === 'type';
          const invalidSize = isInvalid(file) === 'size';
          const isLoading = loadingName === file.name;

          return (
            <li
              data-tooltip-id={isInvalid(file) ? 'tooltip-file' : undefined}
              data-tooltip-content={
                invalidSize
                  ? `Размер файла слишком большой (макс. ${maxFile.name})`
                  : 'Формат файла недоступен для загрузки'
              }
              key={index}
              className={styles.file}
            >
              <div>
                <List />
                <small className={invalidType ? styles.error : ''}>{file.name}</small>
                {isUploaded ? (
                  <small className={styles.size} style={{ color: '#25D366' }}>
                    Загружен
                  </small>
                ) : (
                  <small className={`${styles.size} ${invalidSize ? styles.error : ''}`}>{convertFileSize(file)}</small>
                )}
              </div>
              <button
                disabled={isLoading}
                title="Удалить файл из списка"
                onClick={() => (isUploaded ? onDeleteUploaded(fileId, file.name) : onDelete(file.name))}
              >
                {isLoading ? '...' : <Remove />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListUploadedFiles;
