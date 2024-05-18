import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
      template: '%s | Sobre mi',
      default: 'Sobre mi',
    },
    //description: 'The official Next.js Learn Dashboard built with App Router.',
    //metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  };

export default function Page() {
   return <p>Sobre mi</p>
}