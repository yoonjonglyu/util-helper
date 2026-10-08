// cryptoUtils.test.ts
// Ensure WebCrypto is available in Node 18 Jest VM environments
if (typeof globalThis.crypto === 'undefined' && typeof process !== 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { webcrypto } = require('crypto');
    if (webcrypto) {
      // @ts-ignore
      globalThis.crypto = webcrypto;
    }
  } catch {
    // ignore
  }
}

import {
  encryptData,
  decryptData,
  generateSalt,
  generatePassword,
  generatePasswordWithSaltAndEncrypt,
  decryptPasswordWithSalt,
} from './crypto';

describe('Crypto Utils', () => {
  const testData = 'Hello, world!';
  const password = 'StrongPassword123!';
  const salt = 'UniqueSalt123!';

  it('should encrypt and decrypt data correctly', async () => {
    const { encryptedData, iv } = await encryptData(testData, password, salt);
    const decrypted = await decryptData(encryptedData, iv, password, salt);
    expect(decrypted).toBe(testData);
  });

  it('should fail to decrypt with wrong password', async () => {
    const { encryptedData, iv } = await encryptData(testData, password, salt);
    await expect(
      decryptData(encryptedData, iv, 'WrongPassword', salt),
    ).rejects.toThrow();
  });

  it('should generate random salt and password of correct length', () => {
    const salt = generateSalt();
    const password = generatePassword(16);

    expect(typeof salt).toBe('string');
    expect(salt).toMatch(/^[0-9a-f]{32}$/); // 16 bytes = 32 hex chars
    expect(typeof password).toBe('string');
    expect(password.length).toBe(16);
    expect(generatePassword(0)).toBe('');
    expect(generatePassword(32).length).toBe(32);
  });

  it('should generate password+salt and encrypt data correctly', async () => {
    const { password, salt, encryptedData } =
      await generatePasswordWithSaltAndEncrypt(16, testData);
    const decrypted = await decryptPasswordWithSalt(
      encryptedData.encryptedData,
      encryptedData.iv,
      password,
      salt,
    );
    expect(decrypted).toBe(testData);
  });

  it('should throw an error when data is tampered', async () => {
    const { password, salt, encryptedData } =
      await generatePasswordWithSaltAndEncrypt(16, testData);

    // Tamper with encrypted data
    encryptedData.encryptedData[0] ^= 1;

    await expect(
      decryptPasswordWithSalt(
        encryptedData.encryptedData,
        encryptedData.iv,
        password,
        salt,
      ),
    ).rejects.toThrow();
  });
});
