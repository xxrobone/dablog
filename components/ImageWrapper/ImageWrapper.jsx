import Image from 'next/image';
import IMG1 from '/public/images/coffee.jpg';

// styles
import styles from './ImageWrapper.module.scss';

/* const one = {
  id: 1,
  img: IMG1,
  title: 'Coffee',
  desc: '& Code',
}; */

const ImageWrapper = ({ title, desc, img }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image className={styles.img} src={img} alt={title} fill></Image>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default ImageWrapper;
