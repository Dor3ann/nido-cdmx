'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FadeImageProps {
  src: string;
  alt: string;
  /** Pass fill={true} to make the image fill its absolutely-positioned parent */
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
}

/**
 * Wrapper around next/image that fades the photo in once it has loaded.
 * Works with source.unsplash.com redirect URLs via unoptimized={true}.
 */
export default function FadeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  sizes,
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  const sharedProps = {
    src,
    alt,
    unoptimized: true,          // needed for redirect-based URLs like source.unsplash.com
    onLoad: () => setLoaded(true),
    className: `transition-opacity duration-700 ease-in-out object-cover ${
      loaded ? 'opacity-100' : 'opacity-0'
    } ${className}`,
    sizes,
  };

  if (fill) {
    return <Image {...sharedProps} fill />;
  }

  return <Image {...sharedProps} width={width ?? 800} height={height ?? 500} />;
}
