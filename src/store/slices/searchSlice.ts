import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

interface SearchState {
  query: string;
  results: Post[];
  loading: boolean;
  notFound: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  notFound: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSearchLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setSearchResults(state, action: PayloadAction<Post[]>) {
      state.results = action.payload;
      state.notFound = action.payload.length === 0;
    },
    resetSearch(state) {
      state.query = '';
      state.results = [];
      state.loading = false;
      state.notFound = false;
    },
  },
});

export const {
  setSearchQuery,
  setSearchLoading,
  setSearchResults,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
