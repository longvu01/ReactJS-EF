const addNewHobby = (payload) => ({
  type: 'ADD_HOBBY',
  payload,
});

const setActiveHobby = (payload) => ({
  type: 'SET_ACTIVE_HOBBY',
  payload,
});

export { addNewHobby, setActiveHobby };
