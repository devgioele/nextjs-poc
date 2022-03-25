import { getISS, useISS } from '../lib/api';
import { ISSNowData } from '../types/apiExternal';
import styles from '../styles/ISS.module.css';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import printLoc from '../lib/common';

type ISSProps = {
  issServerSide?: ISSNowData;
};

type ISSStaticProps = {
  props: ISSProps;
};

const ISSServerSide: NextPage<ISSProps> = ({ issServerSide }) => {
  const { data: currentISSData, error: currentISSError } = useISS(3000);
  const { longitude: staticLon, latitude: staticLat } =
    issServerSide?.iss_position || {};
  const { longitude: currentLon, latitude: currentLat } =
    currentISSData?.iss_position || {};

  useEffect(() => {
    if (currentISSError) {
      toast.error('ISS data could not be fetched!');
    }
  }, [currentISSError]);

  return (
    <div className={styles.grid}>
      <a className={styles.card}>
        <h2>getServerSideProps</h2>
        {staticLon && staticLat ? (
          <p>
            {`Position of the ISS at request time: ${printLoc(
              staticLon,
              staticLat
            )}`}
          </p>
        ) : (
          <p className={styles.error}>
            Data could not be fetched at build time
          </p>
        )}
      </a>
      <a className={styles.card}>
        <h2>polling</h2>
        <p>
          {`Current position of the ISS: ${
            currentLon && currentLat
              ? printLoc(currentLon, currentLat)
              : 'loading'
          }`}
        </p>
      </a>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<ISSStaticProps> => {
  const response = await getISS().catch();

  return {
    props: {
      issServerSide: response?.data,
    },
  };
};

export default ISSServerSide;
