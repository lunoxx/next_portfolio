import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Head from 'next/head';
import constants from '../../constants';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

export async function getStaticProps() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  });

  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  });

  const projects = entries.items.map(entry => ({
    title: entry.fields.title,
    slug: entry.fields.slug,
    description: documentToHtmlString(entry.fields.description),
    thumbnail_image: `${entry.fields.thumbnailImage.fields.file.url}?fm=webp`,
  }));

  return {
    props: { projects, constants},
    revalidate: 60
  };
}

export default function Projects({ projects, constants }) {
  return (
    <>
      <Head>
        <title>Mesesan Alin - Projects</title>
      </Head>

      <Layout>
      <Header constants={constants} />

      <div className="mx-auto max-w-screen-lg px-3 py-6">
        <h1 className="text-2xl font-bold mb-8">
          View <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">all Projects</span>
        </h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {projects.map(project => (
            <div
              key={project.slug}
              className="border rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col relative transform transition duration-300 hover:scale-105"
            >
              <a
                href={`/projects/${project.slug}`}
                className="h-56 w-full rounded-t-lg mx-auto bg-cover bg-center shadow-[inset_0px_-36px_34px_-20px_rgba(31,41,55,0.53)]"
                style={{ backgroundImage: `url('${project.thumbnail_image}')` }}
              ></a>

              <div className="p-5 mb-14">
                <a
                  href={`/projects/${project.slug}`}
                  className="text-2xl font-bold tracking-tight text-white hover:text-sky-500 duration-150"
                >
                  {project.title}
                </a>
                <div
                  className="mt-2 font-normal text-gray-400 overflow-x-auto scrollbar-hide"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>

              <a
                href={`/projects/${project.slug}`}
                className="absolute bottom-5 right-5 inline-flex items-center border font-medium rounded-lg text-sm px-5 py-2.5 text-center border-gray-600 text-gray-400 hover:text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-800"
              >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
      
            <Footer constants={constants}/>
      
          </Layout>
    </>
  );
}