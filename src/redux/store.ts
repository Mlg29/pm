import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './slices/AuthSlice'
import FootballReducer from './slices/FootballSlice'
import BetReducer from './slices/BetSlice'
import TransactionReducer from "./slices/TransactionSlice"
import NotificationReducer from './slices/NotificationSlice'
import RestrictionReducer from './slices/RestrictionSlice'
import TennisReducer from './slices/TennisSlice'
import HorseReducer from './slices/horseSlice'
import BoxingReducer from './slices/BoxingSlice'
import BasketballSlice from './slices/BasketballSlice'
import MmaSlice from './slices/MmaSlice'
import GolfSlice from './slices/GolfSlice'
import Easport from './slices/Easport'
import DartSlice  from './slices/DartSlice'
import SnookerSlice from './slices/SnookerSlice'
import VolleyballSlice from './slices/VolleyballSlice'
import HandballSlice from './slices/HandballSlice'
import AflSlice from './slices/AflSlice'
import FutsalSlice  from './slices/Futsal'

export const store = configureStore({
  reducer: {
   auth: AuthReducer,
   football: FootballReducer,
   bet: BetReducer,
   transaction: TransactionReducer,
   notification: NotificationReducer,
   restriction: RestrictionReducer,
   tennis: TennisReducer,
   horse: HorseReducer,
   boxing: BoxingReducer,
   basketball: BasketballSlice,
   mma: MmaSlice,
   golf: GolfSlice,
   easport: Easport,
   dart: DartSlice,
   snooker: SnookerSlice,
   volleyball: VolleyballSlice,
   handball: HandballSlice,
   afl: AflSlice,
   futsal: FutsalSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these paths in the state
      ignoredPaths: ['auth.image.headers'],
      // Ignore these action types
      ignoredActionPaths: ['meta.arg', 'payload.headers'],
    },
  }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch