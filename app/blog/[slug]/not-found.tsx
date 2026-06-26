import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostNotFound() {
  return (
    <div className='container-x mx-auto max-w-2xl pt-40 pb-32 text-center'>
      <h1 className='text-4xl font-display tracking-tight text-foreground'>Post not found</h1>
      <p className='mt-3 text-muted-foreground'>That field note may have moved or been retired.</p>
      <Link
        href='/blog'
        className='mt-6 inline-flex items-center gap-2 rounded-full bg-leaf-900 px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-leaf-700'
      >
        <ArrowLeft className='size-4' /> Back to blog
      </Link>
    </div>
  );
}
