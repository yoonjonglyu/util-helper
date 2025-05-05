// cryptoUtils.test.ts
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
    expect(typeof password).toBe('string');
    expect(password.length).toBe(16);
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
