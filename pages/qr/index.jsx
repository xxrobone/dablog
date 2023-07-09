import React from 'react';
import Image from 'next/image';
import Panda from '/public/images/hypepanda.png';
import styles from './qr.module.scss';
import QrCode from '../../components/qrcode/QrCode';

const qr = () => {
  console.log(Panda);
  return (
    <div className={styles.qr}>
      <QrCode
        text={`Date: ${
          new Date().toLocaleString() + ' '
        } \n Player name: HypedPanda69 \n Gamer-ID: 345678 5644 \n All Access`}
        /* image={Panda} */
              name='HypedPanda69'
              game='Fortnite'
      />
      <Image src={Panda} alt='player' className={styles.playerimg} />
    </div>
  );
};

export default qr;
