import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { historyAPI } from '../api/historyApi';


export const postHistory = createAsyncThunk(
  "user/postHistory",
  async (args: { url: string, userEmail: string }, thunkAPI: any) => {
    const { url, userEmail } = args;
    const currentUser = thunkAPI.getState().user[userEmail];

    if (currentUser) {
      return await historyAPI.post(currentUser, url);
    } else { return }
  }
);

export const getHistory = createAsyncThunk(
  "user/getHistory",
  async (userEmail: string, thunkAPI: any) => {
    const currentUser: User = thunkAPI.getState().user[userEmail];
    return await historyAPI.get(currentUser);
  }
);

export const deleteHistory = createAsyncThunk(
  "user/deleteHistory",
  async (userEmail: string, thunkAPI: any) => {
    const currentUser: User = thunkAPI.getState().user[userEmail];
    return await historyAPI.delete(currentUser);
  }
);

export interface User {
  [prop: string]: any;
  username?: string,
  email?: string,
  password?: string,
  isAuth?: boolean,
  favorites?: { name: string, url: string }[],
  historySearch?: string[]
}

const userSlice = createSlice({
  name: "user",
  initialState: {} as Record<string, User>,
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
    },
  },

  extraReducers: (builder) => {
    builder.addCase(postHistory.fulfilled, (state, action) => {
      const userEmail = action.payload?.currentUser.email;
      if (userEmail) {
        state[userEmail].historySearch = action.payload?.historySearchCopy;
      }
    });

    builder.addCase(getHistory.fulfilled, (state, action) => {
      const userEmail = action.payload.currentUser.email;
      if (userEmail) {
        state.user[userEmail].historySearch = action.payload.links;
      }
    });

    builder.addCase(deleteHistory.fulfilled, (state, action) => {
      const userEmail = action.payload.currentUser.email;
      if (userEmail) {
        state[userEmail].historySearch = [];
      }
    });
  }
});

export const {
  signIn,
  logOut,
  addUser,
  toggleFavorite,
  deleteFavorite
} = userSlice.actions;

export default userSlice.reducer;
