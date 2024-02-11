"use client";

import React from "react";
import { YouTubeEmbed } from "react-social-media-embed";

interface YoutubeVideoProps {
  width: string;
  height: number;
  url: string;
}

const YoutubeVideo = ({ height, url, width }: YoutubeVideoProps) => {
  return <YouTubeEmbed width={width} height={height} url={url} />;
};

export default YoutubeVideo;
