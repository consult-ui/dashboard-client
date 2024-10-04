import { IRefresh } from '@/app/api/types/user.ts';
import styles from '@/features/message/Message.module.css';
import { TOAST_ERROR } from '@/shared/constants/toasts.ts';
import Cookies from 'js-cookie';
import { useState } from 'react';

const errText = 'Ошибка скачивания файла! Попробуйте перезагрузить страницу или сообщите в поддержку';

const File = ({ files, chatId }: { files: { file_id: string }[]; chatId: string | null }) => {
  const [isLoadingId, setIsLoadingId] = useState<null | string>(null);

  const onRefresh = async (file_id: string) => {
    try {
      const refreshResult = await fetch(import.meta.env.VITE_API_URL + '/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: Cookies.get('refresh_token') }),
      });
      const refreshResJSON: IRefresh = await refreshResult.json();
      if (refreshResJSON?.success) {
        Cookies.set('access_token', refreshResJSON.data.access_token, { expires: 90 });
        Cookies.set('refresh_token', refreshResJSON.data.refresh_token, { expires: 90 });
        onClick(file_id);
      } else {
        throw new Error(undefined);
      }
    } catch (err) {
      TOAST_ERROR(errText);
      console.log(err);
    }
  };

  const onClick = (file_id: string) => {
    if (!chatId) {
      TOAST_ERROR('Ошибка нахождения ID файла, перезагрузите страницу и попробуйте заново!');
      return;
    }
    setIsLoadingId(file_id);
    fetch(import.meta.env.VITE_API_URL + `/chat/${chatId}/download-file/${file_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          onRefresh(file_id);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const name: string = response.headers.get('content-disposition') as string;
        return {
          blob: response.blob(),
          name: name.slice(name.indexOf('=') + 1, name.length),
        };
      })
      .then(async (res) => {
        if (!res) return;
        const link = document.createElement('a');
        const blob = await res.blob;
        link.href = window.URL.createObjectURL(blob);
        link.download = res.name; // Укажи имя файла
        link.click();
      })
      .catch(() => {
        TOAST_ERROR(errText);
      })
      .finally(() => setIsLoadingId(null));
  };

  return (
    <>
      {files.map(({ file_id }, idx) => (
        <button
          key={file_id}
          disabled={isLoadingId === file_id}
          className={styles.file}
          onClick={() => onClick(file_id)}
        >
          {isLoadingId === file_id ? 'Загрузка...' : `Скачать файл: ${idx + 1}`}
        </button>
      ))}
    </>
  );
};

export default File;
