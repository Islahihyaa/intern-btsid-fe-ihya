export const persistStatePlugin = (context) => {
  const { store } = context;

  store.$subscribe((mutation, state) => {
    localStorage.setItem(store.$id, JSON.stringify(state));
  });
};
