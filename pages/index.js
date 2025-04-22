import { createClient } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import tagsConfig from '../TagsColors';

import constants from '../constants';
import Layout from '../components/Layout';


export async function getStaticProps() {
  const client = createClient({
    accessToken: process.env.CONTENTFUL_TOKEN,
    space: process.env.CONTENTFUL_SPACE_ID,
  });

  const entries = await client.getEntries({
    limit: 5,
    content_type: 'blogPost',
    order: '-sys.createdAt',
  });

  const topics = entries.items.map(entry => ({
    title: entry.fields.title,
    slug: entry.fields.slug,
    description: documentToHtmlString(entry.fields.description),
    content: documentToHtmlString(entry.fields.content),
    thumbnail_image: `${entry.fields.thumbnailImage.fields.file.url}?fm=webp`,
    tags: entry.metadata.tags,
  }));

  return {
    props: {
      topics,
      year: new Date().getFullYear(),
      constants
    },
    revalidate: 60,
  };
}

export default function Home({ topics, year, constants  }) {
  return (

    <>
    
    <Head><title>Mesesan Alin - Portfolio</title></Head>

    <Layout>

      <Header constants={constants} />

      {/* Hero section */}
      <section className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="flex flex-col items-center md:flex-row-reverse md:justify-between md:gap-x-24 overflow-hidden">
          <div className="md:flex md:shrink-0">
            <img className="h-80 min-w-[16rem]" src="/images/avatar.webp" alt="Avatar" />
          </div>

          <div className="flex flex-col items-center text-center md:block md:text-left">
            <h1 className="text-3xl font-bold">
              <span>Hi there, </span>
              <span className="inline-block">
                I'm{' '}
                <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  {constants.author.full_name}
                </span>
                <span className="animate-waving-hand inline-block">👋</span>
              </span>
            </h1>
            <p className="mt-6 text-xl leading-9">{constants.SEO.hero_text}</p>

            {/* Social icons */}
            <div className="mt-9 flex gap-4 justify-center md:justify-start">
              <a href={constants.author.github} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github text-sky-500 text-2xl transform transition duration-200 hover:scale-150"></i>
              </a>
              <a href={constants.author.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook text-sky-500 text-2xl transform transition duration-200 hover:scale-150"></i>
              </a>
              <a href={constants.author.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin text-sky-500 text-2xl transform transition duration-200 hover:scale-150"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects section */}
      <section className="mx-auto max-w-screen-lg px-3 py-6">
        <div className="flex items-center justify-between flex-col sm:flex-row mb-6">
          <div className="text-2xl font-bold">
            Recent{' '}
            <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </div>
          <div className="text-sm font-bold">
            <a href="/projects">View all Projects →</a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {topics.map((entry) => (
            <div
              key={entry.slug}
              className="flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-3 md:flex-row"
            >
              <div className="shrink-0 overflow-auto mb-3 md:mb-0 w-full h-64 sm:h-96 md:h-36 md:w-48">
                <a
                  href={`/projects/${entry.slug}`}
                  className="w-full h-full block rounded-t-lg mx-auto bg-cover bg-center shadow-[inset_0px_-36px_34px_-20px_rgba(31,41,55,0.53)]"
                  style={{ backgroundImage: `url('${entry.thumbnail_image}')` }}
                ></a>
              </div>

              <div className="w-full">
                <div className="flex flex-col items-center gap-y-2 md:flex-row">
                  <a className="hover:text-cyan-400" href={`/projects/${entry.slug}`}>
                    <div className="text-xl font-semibold md:mr-4">{entry.title}</div>
                  </a>

                  <div className="flex flex-wrap justify-center gap-2">
                    {entry.tags?.length > 0 &&
                      entry.tags.map((tagObj, idx) => {

                        const tagId = tagObj.sys.id
                        const tagName = tagsConfig[tagId]?.tagName
                        const tagColor = tagsConfig[tagId]?.colors

                        return (
                          <div
                            key={idx}
                            className={`rounded-md px-2 py-1 text-xs font-semibold ${tagColor}`}
                          >
                            {tagName}
                          </div>
                        )
                      })}
                  </div>
                </div>
                <div className="mt-3 text-gray-300 text-center md:text-left overflow-auto scrollbar-hide">
                  <div dangerouslySetInnerHTML={{ __html: entry.description }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer constants={constants}/>

    </Layout>
    
    </>
    
  );
}
