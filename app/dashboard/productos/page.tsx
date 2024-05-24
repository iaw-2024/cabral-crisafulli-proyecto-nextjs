import { Metadata } from 'next';
import 'app/dashboard/productos/style.css';

/*export const metadata: Metadata = {
    title: {
      template: '%s | Productos',
      default: 'Productos',
    },
    //description: 'The official Next.js Learn Dashboard built with App Router.',
    //metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  };*/

export default function Page() {
    return <p className = 'productos'>Productos</p>
}