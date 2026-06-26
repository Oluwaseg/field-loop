import Link from 'next/link';
import { ArrowUpRight, Sprout } from 'lucide-react';

export function BlogHeader() {
  return (
    <header className='border-b border-border bg-background/80 backdrop-blur-xl'>
      <div className='container-x mx-auto flex w-full max-w-7xl items-center justify-between py-4'>
        <Link href='/' className='flex items-center gap-2 text-base font-semibold tracking-tight'>
          <span className='grid size-8 place-items-center rounded-full bg-leaf-700 text-primary-foreground'>
            <Sprout className='size-4' strokeWidth={2.4} />
          </span>
          Field<span className='text-leaf-700'>Loop</span>
        </Link>

        <nav className='flex items-center gap-2'>
          <Link
            href='/blog'
            className='rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground'
          >
            Blog
          </Link>
          <Link
            href='/#contact'
            className='group inline-flex items-center gap-1.5 rounded-full bg-leaf-900 px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-leaf-700'
          >
            Get in touch
            <ArrowUpRight className='size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </Link>
        </nav>
      </div>
    </header>
  );
}
