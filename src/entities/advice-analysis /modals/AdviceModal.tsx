import styles from '../AdviceAnalysis.module.css';
import ErrorAlert from '@/shared/ui/error-alert';
import { ModalGeneral } from '@/shared/ui/modal-general';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    data: string | undefined;
    isError: boolean;
    isLoading: boolean;
  };
};

const AdviceModal = ({ isOpen, onClose, data: { data, isLoading, isError } }: Props) => {
  const [text, setText] = useState<string | TrustedHTML>('');

  const parseMarkdown = async (markdownText: string) => {
    const file = await remark().use(html).process(markdownText);
    return String(file);
  };

  useEffect(() => {
    if (!data) return;
    parseMarkdown(data).then((res) => setText(res));
  }, [data]);

  return (
    <ModalGeneral open={isOpen} onClose={onClose} title="Совет дня" gradient>
      <div className={styles.modalBody}>
        {text && <div className={styles.text} dangerouslySetInnerHTML={{ __html: text }} />}
        {!text && isLoading && <SuspenseLoader />}
        {!text && isError && <ErrorAlert />}
      </div>
    </ModalGeneral>
  );
};

export default AdviceModal;
