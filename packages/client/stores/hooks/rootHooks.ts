import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../rootStore"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<RootDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
