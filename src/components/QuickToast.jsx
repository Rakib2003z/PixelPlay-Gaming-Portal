import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';
import './QuickToast.css';

export default function QuickToast() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="quick-toast-wrap" role="status" aria-live="polite">
      <div className="quick-toast-body">
        <CheckCircle2 size={18} className="toast-icon" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
