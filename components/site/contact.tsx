'use client';

import { ArrowRight, Check, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

import type { SiteSettings } from '@/sanity/types/site-settings';
import { Container } from './container';

type Status = 'idle' | 'sending' | 'sent' | 'error';

type ContactProps = {
  settings: Pick<SiteSettings, 'address' | 'phone' | 'email'>;
};

export function Contact({ settings }: ContactProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: fd.get('fn'),
          lastName: fd.get('ln'),
          email: fd.get('email'),
          interest: fd.get('interest'),
          message: fd.get('msg'),
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      setStatus('sent');
      form.reset();

      // Optional: reset button after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  }

  return (
    <section id='contact' className='section-pad'>
      <Container>
        <div className='overflow-hidden rounded-[2rem] border border-border bg-card ring-soft'>
          <div className='grid lg:grid-cols-[0.95fr_1.05fr]'>
            {/* Left */}

            <div className='relative isolate overflow-hidden bg-leaf-900 p-8 text-primary-foreground sm:p-12'>
              <div
                className='absolute inset-0 -z-10 opacity-60 [background:radial-gradient(500px_300px_at_90%_10%,oklch(0.82_0.17_88/0.2),transparent_60%),radial-gradient(400px_300px_at_-10%_100%,oklch(0.5_0.15_150/0.4),transparent_60%)]'
                aria-hidden
              />

              <span className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-brand'>
                <span className='size-1.5 rounded-full bg-amber-brand' />
                Get in touch
              </span>

              <h2 className='mt-6 text-balance text-4xl leading-tight sm:text-5xl'>
                Start your agritech journey with us.
              </h2>

              <p className='mt-5 max-w-md text-base leading-relaxed text-white/75'>
                Whether you're a farmer looking to cut losses, a cooperative
                ready to scale, or a partner interested in collaborating, we'd
                love to hear from you.
              </p>

              <ul className='mt-10 space-y-5 text-sm'>
                {[
                  settings.address && {
                    Icon: MapPin,
                    h: 'Location',
                    body: settings.address,
                  },
                  settings.phone && { Icon: Phone, h: 'Phone', body: settings.phone },
                  settings.email && { Icon: Mail, h: 'Email', body: settings.email },
                ]
                  .filter(
                    (
                      item,
                    ): item is { Icon: typeof MapPin; h: string; body: string } =>
                      Boolean(item),
                  )
                  .map(({ Icon, h, body }) => (
                    <li key={h} className='flex gap-4'>
                      <span className='grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-amber-brand'>
                        <Icon className='size-4' />
                      </span>
                      <div>
                        <div className='text-xs font-semibold uppercase tracking-wider text-white/60'>
                          {h}
                        </div>
                        <p className='mt-1 whitespace-pre-line text-white/85'>{body}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Right */}

            <form onSubmit={onSubmit} className='grid gap-5 p-8 sm:p-12'>
              <h3 className='text-xl font-semibold text-leaf-900'>
                Send us a message
              </h3>

              <div className='grid gap-5 sm:grid-cols-2'>
                <Field
                  label='First name'
                  id='fn'
                  placeholder='Amina'
                  required
                />

                <Field label='Last name' id='ln' placeholder='Bello' required />
              </div>

              <Field
                label='Email'
                id='email'
                type='email'
                placeholder='amina@example.com'
                required
              />

              <div className='grid gap-2'>
                <label
                  htmlFor='interest'
                  className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'
                >
                  I'm interested in
                </label>

                <select
                  id='interest'
                  name='interest'
                  defaultValue='Smart storage and logistics'
                  className='rounded-2xl border border-border bg-background px-4 py-3'
                >
                  <option>Smart storage and logistics</option>
                  <option>IoT soil monitoring</option>
                  <option>Aerial disease diagnostics</option>
                  <option>Predictive market analytics</option>
                  <option>Partnership or investment</option>
                  <option>FieldLoop ReGen</option>
                </select>
              </div>

              <div className='grid gap-2'>
                <label
                  htmlFor='msg'
                  className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'
                >
                  Message
                </label>

                <textarea
                  id='msg'
                  name='msg'
                  rows={5}
                  minLength={5}
                  required
                  placeholder='Tell us about your farm or project...'
                  className='resize-none rounded-2xl border border-border bg-background px-4 py-3'
                />
              </div>

              {status === 'error' && (
                <div className='rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600'>
                  {error}
                </div>
              )}

              <button
                disabled={status === 'sending'}
                className='group inline-flex items-center justify-center gap-2 rounded-full bg-leaf-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-leaf-700 disabled:opacity-60'
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className='size-4 animate-spin' />
                    Sending...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <Check className='size-4' />
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className='size-4 transition group-hover:translate-x-1' />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

type FieldProps = {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function Field({
  label,
  id,
  type = 'text',
  placeholder,
  required,
}: FieldProps) {
  return (
    <div className='grid gap-2'>
      <label
        htmlFor={id}
        className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className='rounded-2xl border border-border bg-background px-4 py-3'
      />
    </div>
  );
}
