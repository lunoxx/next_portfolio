// Placeholder for all projects page
import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Head from 'next/head';
import constants from '../../constants';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';


export async function getStaticPaths() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  });

  const entries = await client.getEntries({ content_type: 'blogPost' });

  const paths = entries.items.map(item => ({
    params: { slug: item.fields.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  });

  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
    limit: 1,
  });

  const entry = entries.items[0];
  const item = {
    title: entry.fields.title,
    slug: entry.fields.slug,
    description: documentToHtmlString(entry.fields.description),
    content: documentToHtmlString(entry.fields.content),
    thumbnail_image: `${entry.fields.thumbnailImage.fields.file.url}?fm=webp`,
    tags: entry.metadata.tags,
    createdAt: new Date(entry.sys.createdAt).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    hasPreview: entry.fields.hasPreview,
  };

  return {
    props: { item, constants },
    revalidate: 60
  };
}

export default function Project({ item, constants }) {
  return (
    <>

      <Head>
        <title>Mesesan Alin / Project: {item.slug}</title>
      </Head>

      <Layout>
        <Header constants={constants} />

        <div className="post-content mx-auto max-w-screen-lg px-3 py-6">
          <h1 className="text-2xl font-bold mb-8">
            Project: <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">{item.title}</span>
          </h1>

          <div className="w-full my-5 p-5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg" dangerouslySetInnerHTML={{ __html: item.description }} />

          <div className="max-h-[35rem] w-full rounded-l-lg overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900">
            <img src={item.thumbnail_image} alt={item.title} className="w-full h-auto" />
          </div>

          <div className="flex justify-center flex-col-reverse sm:flex-row sm:justify-between ">

            {/* Preview button - if project have preview page */}
            
            { item.hasPreview && (
            <Link href={`../preview/${item.slug}`} className="flex items-center justify-center sm:justify-start text-gray-200 mt-3 sm:mt-0">
              <div className="bg-slate-700 w-12 h-12 flex items-center justify-center text-white">
                <FontAwesomeIcon icon={faEye} className='text-xl'/>
              </div>

              <div className="h-full bg-slate-800 px-3">
                <span className="">Preview this project</span>
                <p>Click here</p>
              </div>
            </Link>
            ) }

            <div className="flex items-center justify-center sm:justify-end text-gray-200 mt-3 sm:mt-0">
              <div className="h-full bg-slate-800 px-3 text-right">
                <span className="capitalize">Created at:</span>
                <p>{item.createdAt}</p>
              </div>
              <div className="bg-slate-700 w-12 h-12 flex items-center justify-center">
              <FontAwesomeIcon icon={faClock} className='text-xl'/>
              </div>
            </div>
          </div>

          <div className="my-5 p-5 bg-gradient-to-r from-slate-800/40 to-slate-900 rounded-lg" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>

        <Footer constants={constants} />
      </Layout>
    </>

  );
}