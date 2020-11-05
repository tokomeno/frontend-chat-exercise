import React from 'react';
import { useInput } from '../../hooks/common/useInput';
import styles from './styles.module.scss';

interface Props {
  onSubmit: (s: string) => void;
  disabled?: boolean;
}

export const AddMessage: React.FC<Props> = ({ onSubmit, disabled }) => {
  const inputHandler = useInput('');
  const handleSubmit = () => {
    if (!(inputHandler.value && inputHandler.value.trim().length > 0)) return;
    onSubmit(inputHandler.value);
    inputHandler.setInputValue('');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.addNewMessage}>
        <textarea
          disabled={disabled}
          rows={3}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onChange={inputHandler.onChange}
          value={inputHandler.value}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};
