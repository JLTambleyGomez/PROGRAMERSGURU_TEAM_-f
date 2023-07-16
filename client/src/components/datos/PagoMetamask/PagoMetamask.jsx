import React, { useState } from 'react';
import styles from './PagoMetamask.module.css';
import { getEthvalue } from '../../../axiosRequests/axiosRequests';
import { useNavigate } from 'react-router-dom';

const PagoMetamask = ({ total }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [metamaskinstall, setMetamaskinstall] = useState(false);
  const UsdtValue = total;
  console.log(total);

  const getEthValue = async (UsdtValue) => {
    const ethUSDTPrice = await getEthvalue();
    const usdtToEther = UsdtValue / ethUSDTPrice;
    return usdtToEther;
  };

  const ethToWei = (ethValue) => {
    const weiValue = '0x' + (ethValue * Math.pow(10, 18)).toString(16);
    return weiValue;
  };

  const connectionWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        accountChanged(accounts[0]);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error al conectar la billetera');
      }
    } else {
      setMetamaskinstall(true);
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
  };

  const handlePayment = async () => {
    if (!defaultAccount) {
      setErrorMessage('Debes conectar tu billetera MetaMask antes de hacer un pago');
      return;
    }
  
    try {
      const ethValue = await getEthValue(UsdtValue);
      const extraPercentage = 0.01;
      const adjustedEthValue = ethValue * (1 + extraPercentage);
      const weiValue = ethToWei(adjustedEthValue);
  
      console.log('Valor en Eth:', adjustedEthValue);
      console.log('Valor en Wei:', weiValue);
  
      let transaction;
      try {
        transaction = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: defaultAccount,
              to: '0x419168Bbf61FFa0Fd5d28409Ec214f42aB9dFD45',
              value: weiValue,
            },
          ],
        });
      } catch (error) {
        // Capturar el error específico de MetaMask
        if (error.code === 4001 && error.message === 'MetaMask Tx Signature: User denied transaction signature.') {
          throw new Error('Transacción rechazada por el usuario');
        } else {
          throw error;
        }
      }
  
      console.log(transaction);
  
      setSuccessMessage('Pago exitoso');
      navigate('/MetamaskSuccess', {
        state: {
          transaction: transaction,
        },
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Error al procesar el pago');
      navigate('/MetamaskFailure', {
        state: {
          error: error.message || 'Error al procesar el pago',
        },
      });
    }
  };
  

  return (
    <div className={styles.container}>
      <img
        onClick={connectionWallet}
        className={styles.img}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
        alt="newsBanner"
      />

      <div></div>
      <div className={styles.paymentSection}>
        <p onClick={handlePayment} className={styles.paymentButton} disabled={!defaultAccount}>
          Pay with Metamask
        </p>
      </div>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PagoMetamask;
