import React from 'react';
import Image from 'next/image';
import Panda from '/public/images/robban.png';
import styles from './qr.module.scss';
import QrCode from '../../components/qrcode/QrCode';

const qr = () => {
  console.log(Panda);
  return (
    <div className={styles.qr}>
      <QrCode
        text={`Date: ${
          new Date().toLocaleString() + ' '
        } \n Player name: CanonIceSlurper \n Gamer-ID: 001 001 002 \n All Access`}
        /* image={Panda} */
        name='CanonIceSlurper'
              game='Fortnite'
      />
      <Image src={Panda} alt='player' className={styles.playerimg} />
    </div>
  );
};

export default qr;
