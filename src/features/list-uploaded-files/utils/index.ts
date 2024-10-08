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

export const validFileTypes = [
  'c',
  'cpp',
  'css',
  'csv',
  'docx',
  'gif',
  'go',
  'html',
  'java',
  'jpeg',
  'jpg',
  'js',
  'json',
  'md',
  'pdf',
  'php',
  'pkl',
  'png',
  'pptx',
  'py',
  'rb',
  'tar',
  'tex',
  'ts',
  'webp',
  'xlsx',
  'xml',
  'zip',
  'txt',
];

export const isValidFileType = (file: File): boolean => {
  const { type } = file;
  for (const elem of validFileTypes) {
    if (type.slice(file.type.indexOf('/') + 1, type.length).toLowerCase() === elem) return true;
  }
  return false;
};
