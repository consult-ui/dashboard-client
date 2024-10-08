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
import { setPrintMessage } from '@/app/store/slices/layoutSlice.ts';
import { useAppDispatch } from '@/app/store/store.ts';
import { isFileIsImage } from '@/features/chat-input/utils';
import PopularQuestions from '@/features/popular-questions';
import Arrow from '@/shared/assets/icons/arrow-top.svg?react';
import Clip from '@/shared/assets/icons/clip.svg?react';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import ModalFileUpload from '@/widgets/modal-file-upload';
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react';
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
  const dispatch = useAppDispatch();
  const submitRef = useRef<null | HTMLButtonElement>(null);

  const onClickQuestion = (quest: string) => {
    if (!submitRef?.current) {
      TOAST_ERROR('Ошибка отправки быстрого запроса, попробуйте еще раз');
      return;
    }
    setText(quest);
    setTimeout(() => submitRef?.current?.click(), 10);
  };

  const onSubmit = (e: FormEvent) => {
    e?.preventDefault();
    dispatch(setPrintMessage(true));
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
      {
        id: String(Date.now() + Math.random()),
        text,
        role: 'active_user_message',
        created_at: Date.now(),
        files_count: files.length,
      },
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
            // FIX: очищаем текст инпута и файлы (файлы внутри окна их загрузки очищаются костально за счет очистки файлов тут)
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
      })
      .finally(() => dispatch(setPrintMessage(false)));
  };

  return (
    <>
      <PopularQuestions chatId={chatId} onClick={onClickQuestion} />

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

        {!isLoading && (
          <button disabled={!text} className={styles.button} type="submit" ref={submitRef}>
            <Arrow />
          </button>
        )}

        <ModalFileUpload
          files={files}
          open={isFileUploadOpen}
          onClose={() => setIsFileUploadOpen(false)}
          setFiles={setFiles}
        />
      </form>
    </>
  );
};

export default ChatInput;
