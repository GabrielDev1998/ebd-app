'use client';

import Global from '@/utils/global';
import { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const useRecaptcha = () => {
  const { alertNotification } = Global();
  const recaptcha = useRef<ReCAPTCHA>(null);
  const SITE_KEY = '6LdauPIpAAAAAO-Yw5hkw7Y7QjWSZxEihsTSMTAs';

  async function validateRecaptcha(callback: () => void) {
    const captchaValue = recaptcha.current?.getValue();
    if (!captchaValue)
      alertNotification('error', 'Por favor, verifique se você não é um robô');
    else {
      callback();
    }
  }

  return { recaptcha, validateRecaptcha, SITE_KEY };
};
export default useRecaptcha;
