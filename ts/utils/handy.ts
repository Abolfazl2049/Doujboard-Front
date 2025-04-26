let getToken = () => {
  return localStorage.getItem("token");
};

let setAuthHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };
};
export {getToken, setAuthHeader};
