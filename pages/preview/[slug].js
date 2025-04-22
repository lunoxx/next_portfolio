

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PreviewPage() {
    const { query } = useRouter();
    const slug = query.slug;

    return (
        <div className="w-screen h-screen overflow-hidden">

            <Link href="/projects">
                <div className="w-full text-white text-sm p-4 text-center bg-slate-900">
                    <button className='py-2 px-20 bg-slate-700 rounded-sm border hover:border-slate-400 border-solid border-white uppercase'>Go to projects page</button>
                </div>
            </Link>

            <iframe
                src={`/previews/${slug}/index.html`}
                className="w-full h-full border-0"
                title={`Preview ${slug}`}
            >
            </iframe>

        </div>

    );
}