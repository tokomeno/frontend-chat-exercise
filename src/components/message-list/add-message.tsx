import React from 'react';
import { useInput } from '../../hooks/common/useInput';
import styles from './styles.module.scss';

interface Props {
  onSubmit: (s: string) => void;
}

export const AddMessage: React.FC<Props> = ({ onSubmit }) => {
  const inputHandler = useInput('');
  const handleSubmit = () => {
    onSubmit(inputHandler.value);
    inputHandler.setInputValue('');
  };
  return (
    <div className={styles.footer}>
      <div className={styles.addNewMessage}>
        <textarea
          rows={3}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          onChange={inputHandler.onChange}
          value={inputHandler.value}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};
