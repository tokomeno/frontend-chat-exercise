import React from 'react';
import classNames from 'classnames';

interface Props {
  label: string;
  className?: string;
  hasError?: boolean;
}

export const FormGroup: React.FC<Props> = ({
  label,
  children,
  className,
  hasError,
}) => {
  return (
    <div className={classNames('form-group', className)}>
      <label
        className={classNames({
          ['text-danger']: hasError,
        })}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
