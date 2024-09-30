import styles from './ChatInput.module.css';
import { useSendMessageMutation } from '@/app/api';
import {
  ActiveMessage,
  ActiveMessageInitial,
  FileUploaded,
  ImageNode,
  MessageFull,
  MessageListItem,
  MessageSliced,
  SendMessagePayload,
} from '@/app/api/types/chat.ts';
import { isFileIsImage } from '@/features/chat-input/utils';
import Arrow from '@/shared/assets/icons/arrow-top.svg?react';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import ModalFileUpload from '@/widgets/modal-file-upload';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  chatId: string;
  setActiveMessage: Dispatch<SetStateAction<ActiveMessage>>;
  setMessages: Dispatch<SetStateAction<MessageListItem[]>>;
};

const ChatInput = ({ chatId, setMessages, setActiveMessage }: Props) => {
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [files, setFiles] = useState<FileUploaded[]>([]);
  const [text, setText] = useState('');
  const [send, { isLoading }] = useSendMessageMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const images: ImageNode[] = files
      .filter((file) => isFileIsImage(file))
      .map((file) => ({
        image_file: { file_id: file.data.id },
        type: 'image_file',
      }));
    const payload: SendMessagePayload = {
      content: [{ text, type: 'text' }, ...images],
      attachments: files.filter((file) => !isFileIsImage(file)).map((elem) => elem.data.id),
    };
    // сохранение сообщения пользователя в список сообщений
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now() + Math.random()), text, role: 'active_user_message', created_at: Date.now() },
    ]);
    // Ставим лоадер на загрузку сообщения ассистента
    setActiveMessage({ ...ActiveMessageInitial, is_request_load: true });
    send({
      body: payload,
      chat_id: Number(chatId),
      onChunk: (chunk) => {
        switch (chunk.event) {
          case 'text_delta':
            // пушим дату (текст) в активное сообщение ассистента
            setActiveMessage((prev) => ({
              ...prev,
              text: prev.text + (chunk.data as MessageSliced).value,
              is_request_load: false,
            }));
            break;
          case 'message_done':
            // сохраняем результат в список сообщений и чистим активное сообщение
            setMessages((prev) => [...prev, chunk.data as MessageFull]);
            setActiveMessage(ActiveMessageInitial);
            // очищаем текст инпута и файлы
            setFiles([]);
            setText('');
            break;
        }
      },
    })
      .unwrap()
      .catch((err) => {
        console.log(err);
        TOAST_ERROR('Ошибка обработки сообщения, попробуйте еще раз или обратитесь в поддержку');
      });
  };

  return (
    <form onSubmit={onSubmit} className={styles.wrapper}>
      <button
        disabled={isLoading}
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

      <input
        disabled={isLoading}
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Введите сообщение для помощника ${files.length ? ' (Файлы будут прикреплены к сообщению)' : ''}`}
      />

      <button disabled={isLoading || !text} className={styles.button} type="submit">
        {isLoading ? '...' : <Arrow />}
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
