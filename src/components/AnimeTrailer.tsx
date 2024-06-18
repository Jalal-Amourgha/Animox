"use client";
import React from "react";
import ReactPlayer from "react-player/youtube";

interface AnimeTrailerProps {
  url: string;
}

const AnimeTrailer = ({ url }: AnimeTrailerProps) => {
  return (
    <section className="container mt-[100px]">
      <h1 className="text-4xl text-primary font-semibold mb-5">Trailer</h1>
      <div className="max-w-fit mx-auto rounded-lg overflow-hidden p-4 bg-bg-color-2">
        <div className="rounded-lg overflow-hidden">
          <ReactPlayer url={url} muted playing loop />
        </div>
      </div>
    </section>
  );
};

export default AnimeTrailer;
