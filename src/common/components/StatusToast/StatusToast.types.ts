export type StatusToastAttributes = {
  title: string;
  message: string;
  type: 'success' | 'danger';
};

export type StatusToastProps = StatusToastAttributes & { onClose: () => void };
