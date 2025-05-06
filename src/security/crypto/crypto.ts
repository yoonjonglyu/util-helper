const generateKey = async (password: string, salt: string) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey'],
  );

  return crypto.subtle.deriveKey(
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
  const key = await generateKey(password, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();

  const encrypted = await crypto.subtle.encrypt(
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
  const key = await generateKey(password, salt);
  const decoder = new TextDecoder();

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: new Uint8Array(iv) },
    key,
    new Uint8Array(encryptedData),
  );

  return decoder.decode(decrypted);
};

export const generateSalt = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((byte) => String.fromCharCode(byte))
    .join('');
};
export const generatePassword = (length: number) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
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
