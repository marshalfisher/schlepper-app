export const authTrue = () => {
  return {type: 'AUTH_TRUE'};
};

export const authFalse = () => {
  return {type: 'AUTH_FALSE'};
};

export const changeUser = (text) =>{
    return {type: 'CHANGE_USER', text}
};

export const changeToken = (text) =>{
  return {type: 'CHANGE_TOKEN', text}
};

export const changeCollection = (array) =>{
  return {type: 'CHANGE_COLLECTION', array}
};

export const changeWants = (array) =>{
  return {type: 'CHANGE_WANTS', array}
};

export const changeViewedUser = (username) =>{
  return {type: 'CHANGE_VIEWED_USER', username}
};