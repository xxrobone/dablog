import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import styles from './QrCode.module.css';

const QrCode = ({ text, name, game }) => {
  const [qrSrc, setQrSrc] = useState('');

  useEffect(() => {
    QRCode.toDataURL(text).then((data) => {
      setQrSrc(data);
    });
  }, [text]);

  return (
    <div className={styles.qrcode}>
      <img src={qrSrc} alt='qr-code' className={styles.qr} />
      {/*  {text} */} <br />
      <span className={styles.ticket}></span>
      <p className={styles.playername}>Player name: {name}</p>
      <p className={styles.playername}>Game: {game}</p>
      {/* <div className={styles.time}>{new Date().toLocaleString()}</div> */}
    </div>
  );
};

export default QrCode;
