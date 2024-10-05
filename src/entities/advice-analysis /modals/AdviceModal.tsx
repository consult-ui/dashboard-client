import styles from '../AdviceAnalysis.module.css';
import { useAdviceQuery } from '@/app/api';
import ErrorAlert from '@/shared/ui/error-alert';
import { ModalGeneral } from '@/shared/ui/modal-general';
import SuspenseLoader from '@/shared/ui/suspense-loader';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AdviceModal = ({ isOpen, onClose }: Props) => {
  const { data, isError, isLoading } = useAdviceQuery(undefined, { skip: !isOpen });
  const [text, setText] = useState<string | TrustedHTML>('');

  const parseMarkdown = async (markdownText: string) => {
    const file = await remark().use(html).process(markdownText);
    return String(file);
  };

  useEffect(() => {
    if (!data?.data) return;
    parseMarkdown(data.data).then((res) => setText(res));
  }, [data?.data]);

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
