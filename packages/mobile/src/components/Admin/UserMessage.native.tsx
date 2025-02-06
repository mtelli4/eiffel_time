import { useState } from 'react';
import { Snackbar } from 'react-native-paper';

let showSnackbar: (type: 'success' | 'error', message: string) => void;

export function NotificationContainer() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  showSnackbar = (type, msg) => {
    setMessage(msg);
    setIsError(type === 'error');
    setVisible(true);
  };

  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={{ backgroundColor: isError ? '#D32F2F' : '#388E3C' }}
      action={{
        label: 'OK',
        onPress: () => setVisible(false),
      }}
    >
      {message}
    </Snackbar>
  );
}

export { showSnackbar };
