'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IMG1 from '/public/images/astroProjects.jpg';
import { convertDate } from '@/utils/convertDate';

// styles
import styles from './ImageWrapper.module.scss';

const ImageWrapper = ({ title, created_at, image, slug }) => {
  const imgRef = useRef();

  // have to check these when continueuing
  const onHover = () => {
    imgRef.current.classList.add(`${styles.isHovered}`);
  };

  const notHovered = () => {
    imgRef.current.classList.remove(`${styles.isHovered}`);
  };
  return (
    <div
      className={styles.imageWrapper}
      ref={imgRef}
      onTouchStart={onHover}
      onTouchEnd={notHovered}
    >
      <Image
        className={styles.img}
        src={image ? image : IMG1}
        alt={title}
        fill
        sizes="(max-width: 768px) 100%, (max-width: 1200px) 50vw, 33vw"
      ></Image>
      <h4>{title}</h4>
      <p>{convertDate(created_at)}</p>
      <Link href={`/blog/${slug}`}></Link>
    </div>
  );
};

export default ImageWrapper;
