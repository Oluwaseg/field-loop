'use client';

export function CookiePreferencesButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('fieldloop:open-cookie-settings'));
    }
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='mt-6 inline-flex items-center gap-2 rounded-full bg-leaf-900 px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-leaf-700'
    >
      Manage cookie preferences
    </button>
  );
}
