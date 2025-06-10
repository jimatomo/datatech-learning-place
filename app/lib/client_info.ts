'use client'

export const getClientInfo = () => {
  if (typeof window === 'undefined') {
    return {
      os: 'Unknown',
      device: 'Unknown',
      user_agent: 'Unknown',
    };
  }

  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(ua);
  const os = (() => {
    if (ua.indexOf('Win') !== -1) return 'Windows';
    if (ua.indexOf('Mac') !== -1) return 'MacOS';
    if (ua.indexOf('Linux') !== -1) return 'Linux';
    if (ua.indexOf('Android') !== -1) return 'Android';
    if (ua.indexOf('like Mac') !== -1) return 'iOS'; // for iPad
    return 'Unknown';
  })();

  return {
    os,
    device: isMobile ? 'mobile' : 'desktop',
    user_agent: ua,
  };
}; 