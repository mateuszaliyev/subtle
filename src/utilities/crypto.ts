const encoder = new TextEncoder();

const deriveKeyFromPassword = async (
  password: string,
  salt: Uint8Array,
  keyUsages: Iterable<KeyUsage>,
) =>
  crypto.subtle.deriveKey(
    {
      hash: "SHA-256",
      iterations: 250000,
      name: "PBKDF2",
      salt,
    },
    await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveKey"],
    ),
    { length: 256, name: "AES-GCM" },
    false,
    keyUsages,
  );

export const decrypt = async (encryptedData: Uint8Array, password: string) => {
  const salt = encryptedData.slice(0, 16);
  const initializationVector = encryptedData.slice(16, 16 + 12);
  const data = encryptedData.slice(16 + 12);
  const key = await deriveKeyFromPassword(password, salt, ["decrypt"]);

  const buffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: initializationVector },
    key,
    data,
  );

  return buffer;
};

export const encrypt = async (data: Uint8Array, password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const initializationVector = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassword(password, salt, ["encrypt"]);

  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: initializationVector },
    key,
    data,
  );

  const encryptedDataArray = new Uint8Array(encryptedData);

  const buffer = new Uint8Array(
    salt.byteLength +
      initializationVector.byteLength +
      encryptedDataArray.byteLength,
  );

  buffer.set(salt, 0);
  buffer.set(initializationVector, salt.byteLength);
  buffer.set(
    encryptedDataArray,
    salt.byteLength + initializationVector.byteLength,
  );

  return buffer;
};
