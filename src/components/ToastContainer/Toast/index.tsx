import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from 'react-icons/fi';

import { Container } from './styles';

import { useToast, ToastMessage } from '../../../hooks/toast';

interface ToastProps {
  toastData: ToastMessage;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ toastData, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toastData.id);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toastData.id]);

  return (
    <Container key={toastData.id} type={toastData.type} style={style}>
      {icons[toastData.type || 'info']}
      <div>
        <strong>{toastData.title}</strong>
        {toastData.description && <p>{toastData.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(toastData.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
