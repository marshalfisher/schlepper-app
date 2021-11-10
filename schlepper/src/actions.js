export const authTrue = () => {
  return {type: 'AUTH_TRUE'};
};

export const authFalse = () => {
  return {type: 'AUTH_FALSE'};
};

export const changeUser = (text) =>{
    return {type: 'CHANGE_USER', text}
}

export const changePass = (text) =>{
    return {type: 'CHANGE_PASS', text}
}