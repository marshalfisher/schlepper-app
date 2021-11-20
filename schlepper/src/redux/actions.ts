export const authTrue = () => {
  return { type: 'AUTH_TRUE' };
};

export const authFalse = () => {
  return { type: 'AUTH_FALSE' };
};

export const changeUser = (text: string) => {
  return { type: 'CHANGE_USER', text };
};

export const changeToken = (text: string) => {
  return { type: 'CHANGE_TOKEN', text };
};

export const changeCollection = (array: object[]) => {
  return { type: 'CHANGE_COLLECTION', array };
};

export const changeWants = (array: object[]) => {
  return { type: 'CHANGE_WANTS', array };
};

export const changeViewedUser = (username: string) => {
  return { type: 'CHANGE_VIEWED_USER', username };
};

export const changeEyedAlbum = (album: string) => {
  return { type: 'CHANGE_EYED_ALBUM', album };
};

export const changeOffer = (album: string) => {
  return { type: 'CHANGE_OFFER', album };
};

export const logOut = () => {
  return { type: 'LOG_OUT' };
};
