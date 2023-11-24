import { configureStore} from '@reduxjs/toolkit';
import checkSlice from './checkSlice';
import electionSlice from './electionSlice';

export default configureStore({
    reducer: {
        checkSlice:checkSlice,
        electionSlice:electionSlice,
    }
});

