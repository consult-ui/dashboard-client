export const convertFileSize = (file: File) => {
  const { size } = file;
  if (size < 1000) {
    return size + ' B';
  } else if (size < 1000 * 1000) {
    return (size / 1000).toFixed() + ' KB';
  } else if (size < 1000 * 1000 * 1000) {
    return (size / (1000 * 1000)).toFixed() + ' MB';
  } else {
    return (size / (1000 * 1000 * 1000)).toFixed() + ' GB';
  }
};
