'use client';

import { toast } from 'sonner';
import Swal, { SweetAlertOptions } from 'sweetalert2';

type TypesAvatar =
  | 'initials'
  | 'identicon'
  | 'bottts'
  | 'fun-emoji'
  | 'avataaars-neutral'
  | 'bottts-neutral'
  | 'lorelei'
  | 'lorelei-neutral'
  | 'rings'
  | 'thumbs';

function Global() {
  const avatar = ({
    type,
    name,
    background = '8257E5',
    color = 'ffffff',
  }: {
    type: TypesAvatar;
    name: string;
    background?: string;
    color?: string;
  }) => {
    return `https://api.dicebear.com/9.x/${type}/svg?seed=${name}&backgroundColor=${background}&textColor=${color}&fontWeight=700&chars=1`;
  };

  const firstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const alertNotification = (
    type: 'success' | 'error' | 'warning' | 'error' | 'info',
    message: string,
  ) => {
    const error = '#FF5630';
    const success = '#22C55E';
    const warning = '#FFAB00';
    const info = '#00B8D9';

    toast[type](message, {
      style: {
        backgroundColor:
          type === 'success'
            ? success
            : type === 'error'
            ? error
            : type === 'warning'
            ? warning
            : type === 'info'
            ? info
            : '',
        color: type === 'warning' ? '#1C252E' : '#fff',
        border: '0px',
        outline: 'none',
      },
    });
  };

  const zeroLeft = (num: number) => {
    return num < 10 ? `0${num}` : num;
  };

  const cutText = (text: string, limit: number = 50) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  };

  const somarTotal = (arr: number[]) => {
    return arr.reduce((ac, num) => {
      return ac + num;
    }, 0);
  };

  const popup = ({
    icon,
    title,
    text,
    ...props
  }: {
    icon: 'question' | 'info' | 'error' | 'warning' | 'success';
    title: string;
    text?: string & SweetAlertOptions;
  }) => {
    Swal.fire({
      icon,
      title,
      text: text ?? undefined,
      background: '#202020',
      color: 'var(--colorText)',
      confirmButtonText: 'OK',
      cancelButtonColor: '#d33',
      ...props,
    });
  };

  return {
    avatar,
    firstLetter,
    alertNotification,
    zeroLeft,
    cutText,
    somarTotal,
    popup,
  };
}

export default Global;
