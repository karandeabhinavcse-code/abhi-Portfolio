import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Smartphone } from 'lucide-react';
import { usePlatform } from '../context/PlatformContext';

export default function MobileStatusBar() {
  const { activePlatform, isMobileViewport } = usePlatform();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      if (activePlatform === 'ios') {
        hours = hours % 12 || 12; // 12-hour format for iOS
      } else {
        hours = hours.toString().padStart(2, '0'); // 24-hour format for Android
      }
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [activePlatform]);

  if (!isMobileViewport) return null;

  if (activePlatform === 'ios') {
    return (
      <div
        style={{
          width: '100%',
          padding: '6px 16px 2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          zIndex: 101,
          userSelect: 'none',
          boxSizing: 'border-box'
        }}
      >
        {/* Left: Time */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{currentTime || '9:41'}</span>
        </div>

        {/* Center: Dynamic Island Pill Notch */}
        <div
          style={{
            background: '#000000',
            width: '88px',
            height: '20px',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.6rem',
            color: '#34D399'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
          <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>VAPT :: OK</span>
        </div>

        {/* Right: Signal, Wi-Fi & iOS Battery */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
          <Signal size={12} />
          <Wifi size={12} />
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              border: '1.5px solid var(--text-primary)',
              borderRadius: '4px',
              padding: '1px 3px',
              height: '11px'
            }}
          >
            <div style={{ width: '9px', height: '5px', background: '#34D399', borderRadius: '1px' }} />
          </div>
        </div>
      </div>
    );
  }

  // Android Material Status Bar
  return (
    <div
      style={{
        width: '100%',
        padding: '5px 16px 2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        fontFamily: '"Roboto", sans-serif',
        zIndex: 101,
        userSelect: 'none',
        boxSizing: 'border-box'
      }}
    >
      {/* Left: Notifications / VAPT Badge & Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{currentTime || '10:49'}</span>
        <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-cyan)', padding: '1px 6px', borderRadius: '4px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          5G+
        </span>
      </div>

      {/* Center: Punch hole camera indicator */}
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#000000',
          border: '1px solid rgba(148, 163, 184, 0.3)'
        }}
      />

      {/* Right: Android Status Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Wifi size={12} style={{ color: 'var(--accent-emerald)' }} />
        <Battery size={13} style={{ color: 'var(--accent-emerald)' }} />
        <span>98%</span>
      </div>
    </div>
  );
}
