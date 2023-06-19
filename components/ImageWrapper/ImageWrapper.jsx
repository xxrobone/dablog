'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import IMG1 from '/public/images/coffee.jpg';
import { convertDate } from '@/utils/convertDate';

// styles
import styles from './ImageWrapper.module.scss';

/* const one = {
  id: 1,
  img: IMG1,
  title: 'Coffee',
  desc: '& Code',
}; */

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
      ></Image>
      <h4>{title}</h4>
      <p>{convertDate(created_at)}</p>
      <Link href={`/blog/${slug}`}></Link>
    </div>
  );
};

export default ImageWrapper;
