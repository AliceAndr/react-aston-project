import { createSlice, current } from "@reduxjs/toolkit";
import { IUser } from "../../hooks/hooks";

const userSlice = createSlice({
  name: "user",
  initialState: {} as Record<string, IUser>,
  reducers: {
    signIn(state, action) {
      const currentUser = action.payload;
      state[currentUser].isAuth = true;
      localStorage.setItem('user', JSON.stringify(state[currentUser]));
    },

    logOut(state, action) {
      const currentUser = action.payload;
      state[currentUser].isAuth = false;
      localStorage.removeItem('user')
    },

    addUser(state, action) {
      const newUser = action.payload.email;
      state[newUser] = action.payload;
    },

     toggleFavorite(state, action) {
      const newFavorite = action.payload as { name: string, url: string };
      const currentUser = JSON.parse(localStorage.getItem('user') ?? '').email
      const userState = current(state[currentUser])
      let flagDeletedOrAdd = ""

      if (userState?.favorites?.length === 0) {
        flagDeletedOrAdd = 'add'
      } else {
        userState.favorites?.forEach(el => {
          if (el.name === newFavorite.name) {
            flagDeletedOrAdd = 'delete'
          } else {
            flagDeletedOrAdd = 'add'
          }
        })
      }

      if (flagDeletedOrAdd === 'add') {
        console.log('add')
        let newFavorites = userState.favorites;
        // @ts-ignore
        newFavorites = [...newFavorites, newFavorite];
        state[currentUser].favorites = newFavorites;
      } else if (flagDeletedOrAdd === 'delete') {
        console.log('delete')
        const newFavorites = userState.favorites?.filter(el => el.name !== newFavorite.name)
        state[currentUser].favorites = newFavorites;
      }
    },

    deleteFavorite(state, action) {
      const deleteFavorite = action.payload as { name: string, url: string };
      const currentUser = JSON.parse(localStorage.getItem('user') ?? '').email
      const userState = current(state[currentUser])
      const newFavorites = userState.favorites?.filter(el => el.name !== deleteFavorite.name)
      state[currentUser].favorites = newFavorites;
    }
  },
});

export const {
  signIn,
  logOut,
  addUser,
  toggleFavorite,
  deleteFavorite
} = userSlice.actions;

export default userSlice.reducer;
