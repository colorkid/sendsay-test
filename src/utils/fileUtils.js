export const createConvertedFiles = (files) => {
  return new Promise((resolve, reject) => {
    const promisesFile = files.map(file => {
      if (!(file instanceof File)) reject({message: 'ERROR: One of "File" is not instance of File'});
      return convertFileToBase64(file);
    });
    Promise.all(promisesFile).then(result => {
      resolve(result);
    }).catch(e => {
      reject(e);
    });
  });
};

export const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) reject({message: 'ERROR: "File" is not instance of File'});
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve({name: file.name, content: event.target.result, encoding: 'base64'});
    };
    reader.readAsDataURL(file);
  });
};

export const getFilesSize = (files) => {
  try {
    if (Array.isArray(files)) {
      if (!files.length) return 0;
      let totalSize = 0;
      files.forEach(item => {
        if (!(item instanceof File)) throw new Error('ERROR: "File" is not instance of File');
        totalSize = totalSize + item.size;
      });
      return totalSize;
    } else {
      throw new Error('ERROR: "Files" is not a array');
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
};