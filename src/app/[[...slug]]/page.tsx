import { ClientOnly } from '@/app/[[...slug]]/client';

export default function Page() {
  return <ClientOnly />;
}
