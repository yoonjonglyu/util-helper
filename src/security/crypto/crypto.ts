const getCrypto = (): Crypto => {
  if (typeof globalThis !== 'undefined' && globalThis.crypto) {
    return globalThis.crypto;
  }
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  }
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nodeCrypto = require('crypto');
      if (nodeCrypto?.webcrypto) {
        return nodeCrypto.webcrypto as unknown as Crypto;
      }
    } catch {
      // ignore
    }
  }
  throw new Error('Web Crypto API is not available in the current environment.');
};

const generateKey = async (password: string, salt: string) => {
  const cryptoObj = getCrypto();
  const encoder = new TextEncoder();
  const keyMaterial = await cryptoObj.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  return cryptoObj.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );
};
export interface encryptedDataProps {
  iv: number[];
  encryptedData: number[];
}
export const encryptData = async (
  data: string,
  password: string,
  salt: string,
) => {
  const cryptoObj = getCrypto();
  const key = await generateKey(password, salt);
  const iv = cryptoObj.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();

  const encrypted = await cryptoObj.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data),
  );

  return {
    iv: Array.from(iv),
    encryptedData: Array.from(new Uint8Array(encrypted)),
  } as encryptedDataProps;
};

export const decryptData = async (
  encryptedData: number[],
  iv: number[],
  password: string,
  salt: string,
) => {
  const cryptoObj = getCrypto();
  const key = await generateKey(password, salt);
  const decoder = new TextDecoder();

  const decrypted = await cryptoObj.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    key,
    new Uint8Array(encryptedData),
  );

  return decoder.decode(decrypted);
};

export const generateSalt = (byteLength: number = 16): string => {
  const cryptoObj = getCrypto();
  const array = new Uint8Array(byteLength);
  cryptoObj.getRandomValues(array);
  return Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

export const generatePassword = (length: number): string => {
  if (length <= 0) return '';
  const cryptoObj = getCrypto();
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charsetLen = charset.length;
  // Use crypto.getRandomValues to eliminate Math.random security vulnerability (CWE-338)
  const randomBytes = new Uint8Array(length);
  cryptoObj.getRandomValues(randomBytes);

  let password = '';
  // Avoid modulo bias by rejection sampling or uniform mapping
  const maxMultiple = Math.floor(256 / charsetLen) * charsetLen;
  for (let i = 0; i < length; i++) {
    let byte = randomBytes[i];
    while (byte >= maxMultiple) {
      const extraByte = new Uint8Array(1);
      cryptoObj.getRandomValues(extraByte);
      byte = extraByte[0];
    }
    password += charset[byte % charsetLen];
  }
  return password;
};

export const generatePasswordWithSalt = (length: number) => {
  const password = generatePassword(length);
  const salt = generateSalt();
  return { password, salt };
};
export const generatePasswordWithSaltAndEncrypt = async (
  length: number,
  data: string,
) => {
  const { password, salt } = generatePasswordWithSalt(length);
  const encryptedData = await encryptData(data, password, salt);
  return { password, salt, encryptedData };
};
export const decryptPasswordWithSalt = async (
  encryptedData: number[],
  iv: number[],
  password: string,
  salt: string,
) => {
  const decryptedData = await decryptData(encryptedData, iv, password, salt);
  return decryptedData;
};
export const decryptPasswordWithSaltAndEncrypt = async (
  encryptedData: number[],
  iv: number[],
  password: string,
  salt: string,
  data: string,
) => {
  const decryptedData = await decryptData(encryptedData, iv, password, salt);
  if (decryptedData !== data) {
    throw new Error('Decryption failed');
  }
  return decryptedData;
};

const cryptos = {
  encryptData,
  decryptData,
  generateSalt,
  generatePassword,
  generatePasswordWithSalt,
  generatePasswordWithSaltAndEncrypt,
  decryptPasswordWithSalt,
  decryptPasswordWithSaltAndEncrypt,
};

export default cryptos;
