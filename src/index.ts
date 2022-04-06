import * as SOAP from 'soap';
import { SHA1 } from 'crypto-js';
import { stringify } from 'crypto-js/enc-hex';

const serviceName = 'Tokenization.svc';
const url = `https://ecm.firstatlanticcommerce.com/PGService/${serviceName}?WSDL`;

interface CardDetails {
  CardNumber: string;
  ExpiryDate: string;
  CustomerReference: string;
  MerchantNumber: string;
  Signature: string;
}

const card: CardDetails = {
  CardNumber: '4242424242424242',
  ExpiryDate: '1022',
  CustomerReference: 'unique-id-internal-user-id',
  MerchantNumber: 'fac-id',
  Signature: '',
};

SOAP.createClientAsync(url)
  .then(async (client: SOAP.Client) => {
    console.log('client initialized');
    const concatenatedString = 'a1B23c1234567890464748FACTEST01';
    const signature = SHA1(concatenatedString);
    const base64Signature = stringify(signature);
    console.log(base64Signature);
    // var hexString = CryptoJS.enc.Hex.stringify(wordArray);
    card.Signature = base64Signature;
    // const result = await client.TokenizeAsync(card);
    // console.log('result', result);
  })
  .catch((error: Error) => {
    console.log('error', error);
  });
