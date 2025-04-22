'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import Form from 'next/form'

export default function Footer({ constants }) {

  const [flash, setFlash] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.emailAdress.value;

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ emailAdress: email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.flash) {
      setFlash(data.flash);
    }
  };

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => {
        setFlash(null);
      }, flash.time_to_show || 6000);
  
      return () => clearTimeout(timer);
    }
  }, [flash]);


  return (
    <>
      {/* Newsletter */}
      <div className="mx-auto max-w-screen-lg px-3 py-6 select-none">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="sm:w-7/12">
            <div className="text-3xl font-bold">
              Subscribe to my{' '}
              <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                Newsletters
              </span>
            </div>
            <p className="mt-3 text-gray-300">
              Stay updated with my latest projects! Subscribe to my newsletter to receive notifications every time I unveil a new project. <b>And the best part?</b> Most of them come with the source code included!
            </p>
          </div>

          <div className="w-full sm:w-5/12">
          
            {flash && (
              <div
                className={`rounded-md p-3 m-3 ${flash.type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  }`}
              >
                <strong>{flash.title}</strong>
                <div
                  dangerouslySetInnerHTML={{ __html: flash.message }}
                  className="mt-1 text-sm"
                />
              </div>
            )}

            <Form onSubmit={handleSubmit} className="flex text-white rounded-full bg-slate-800 px-4 py-2 ring-0 focus-within:ring-2 focus-within:ring-cyan-600 hover:ring-2 hover:ring-cyan-600">
              <input
                className="w-full appearance-none bg-slate-800 focus:outline-none focus:border-sky-500 focus:ring-0 py-0 px-0 border-0"
                placeholder="Type your Email"
                id="emailAdress"
                type="email"
              />
              <button
                className="ml-2 shrink-0 rounded-full bg-gradient-to-br from-sky-500 to-cyan-400 px-3 py-1 text-sm font-medium hover:from-sky-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600/50"
                type="submit"
              >
                Subscribe
              </button>
            </Form>


          </div>
        </div>

        {/* Footer */}
        <footer className="mx-auto max-w-screen-lg px-3 py-6">
          <div className="border-t border-gray-600 pt-5 mt-5">
            <div className="text-sm text-gray-200">
              © Copyright {new Date().getFullYear()}. Built with ♥ by {' '}
              <a
                className="text-cyan-400 hover:underline"
                href={constants.author.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                {constants.author.full_name}
              </a>
              .
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}