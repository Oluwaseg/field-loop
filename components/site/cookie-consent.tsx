'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fieldloop.cookieConsent.v1';
const OPEN_EVENT = 'fieldloop:open-cookie-settings';

type Prefs = { necessary: true; analytics: boolean; marketing: boolean };

const DEFAULTS: Prefs = { necessary: true, analytics: false, marketing: false };

export function openCookieSettings() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

function loadPrefs(): Prefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Prefs) : null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: Prefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);

  useEffect(() => {
    const existing = loadPrefs();
    if (!existing) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
    setPrefs(existing);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setPrefs(loadPrefs() ?? DEFAULTS);
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const persist = (next: Prefs) => {
    setPrefs(next);
    savePrefs(next);
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () =>
    persist({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () =>
    persist({ necessary: true, analytics: false, marketing: false });
  const saveCurrent = () => persist(prefs);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {showSettings && (
            <motion.div
              key='overlay'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[60] bg-leaf-900/40 backdrop-blur-sm'
              onClick={() => setShowSettings(false)}
            />
          )}

          <motion.div
            key='panel'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            role='dialog'
            aria-modal={showSettings}
            aria-label='Cookie preferences'
            className={`fixed z-[70] ${
              showSettings
                ? 'inset-x-4 top-1/2 mx-auto max-w-lg -translate-y-1/2'
                : 'inset-x-4 bottom-4 mx-auto max-w-3xl sm:bottom-6'
            }`}
          >
            <div className='overflow-hidden rounded-3xl border border-border bg-card shadow-[0_20px_60px_-20px_rgba(15,50,32,0.35)]'>
              {!showSettings ? (
                <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6'>
                  <div className='flex items-start gap-3 sm:items-center'>
                    <span className='grid size-10 shrink-0 place-items-center rounded-full bg-amber-soft text-leaf-900'>
                      <Cookie className='size-5' />
                    </span>
                    <p className='text-sm leading-relaxed text-ink-soft'>
                      We use cookies to keep FieldLoop secure and improve your
                      experience. Read our{' '}
                      <Link
                        href='/cookies'
                        className='font-medium text-leaf-700 underline underline-offset-2'
                      >
                        cookie policy
                      </Link>
                      .
                    </p>
                  </div>
                  <div className='flex flex-wrap items-center gap-2 sm:ml-auto'>
                    <button
                      onClick={() => setShowSettings(true)}
                      className='rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-leaf-50'
                    >
                      Customise
                    </button>
                    <button
                      onClick={rejectAll}
                      className='rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-leaf-50'
                    >
                      Reject
                    </button>
                    <button
                      onClick={acceptAll}
                      className='rounded-full bg-leaf-900 px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-leaf-700'
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              ) : (
                <div className='p-6'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <h2 className='text-xl font-semibold text-foreground'>
                        Cookie preferences
                      </h2>
                      <p className='mt-1 text-sm text-ink-soft'>
                        Choose which categories you allow. You can change this
                        any time.
                      </p>
                    </div>
                    <button
                      aria-label='Close'
                      onClick={() => setShowSettings(false)}
                      className='grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-leaf-50'
                    >
                      <X className='size-4' />
                    </button>
                  </div>

                  <div className='mt-6 space-y-3'>
                    <PrefRow
                      title='Strictly necessary'
                      desc='Required for security, login, and remembering your choices.'
                      checked
                      disabled
                    />
                    <PrefRow
                      title='Analytics'
                      desc='Help us understand product usage to improve FieldLoop.'
                      checked={prefs.analytics}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, analytics: v }))
                      }
                    />
                    <PrefRow
                      title='Marketing'
                      desc='Measure campaigns and personalise relevant messaging.'
                      checked={prefs.marketing}
                      onChange={(v) =>
                        setPrefs((p) => ({ ...p, marketing: v }))
                      }
                    />
                  </div>

                  <div className='mt-6 flex flex-wrap items-center justify-end gap-2'>
                    <button
                      onClick={rejectAll}
                      className='rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-leaf-50'
                    >
                      Reject all
                    </button>
                    <button
                      onClick={saveCurrent}
                      className='rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-leaf-50'
                    >
                      Save choices
                    </button>
                    <button
                      onClick={acceptAll}
                      className='rounded-full bg-leaf-900 px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-leaf-700'
                    >
                      Accept all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PrefRow({
  title,
  desc,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className='flex items-start justify-between gap-4 rounded-2xl border border-border bg-background/60 p-4'>
      <div>
        <p className='text-sm font-medium text-foreground'>{title}</p>
        <p className='mt-1 text-xs text-ink-soft'>{desc}</p>
      </div>
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-leaf-700' : 'bg-border'
        } ${disabled ? 'opacity-60' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block size-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
