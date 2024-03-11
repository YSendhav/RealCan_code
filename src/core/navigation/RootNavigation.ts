import * as React from 'react'
import {
    NavigationAction,
    NavigationContainerRef,
    ParamListBase,
} from '@react-navigation/native'

export const navigationRef = React.createRef<NavigationContainerRef<ParamListBase>>()

export const navigate = (name: string, params: ParamListBase[string]) => {
    navigationRef.current?.navigate(name, params)
}

export const goBack = () => {
    navigationRef.current?.goBack()
}

export const dispatch = (action: NavigationAction) => {
    navigationRef.current?.dispatch(action)
}