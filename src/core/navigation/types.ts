import { CompositeNavigationProp, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

export enum Routes {
    Landing = 'Landing',
    Browse = 'Browse',
    SearchPage = 'SearchPage',
    Notifications = 'Notifications',
    MyLists = "MyLists",
    Menu = "Menu",
    MyListsDetails = 'MyListsDetails',
    BrowseConatiner = 'BrowseConatiner',
    SearchPageContainer = 'SearchPageContainer',
    MyListsContainer = 'MyListsContainer',
    NotificationsConatainer = 'NotificationsConatainer',
    MenuContainer = 'MenuContainer',
    PropertyDetailsPage = 'PropertyDetailsPage'
}

export type MyListsTabRoute =
    | Routes.MyLists
    | Routes.MyListsDetails

export type BrowseTabRoute =
    | Routes.BrowseConatiner
    | Routes.PropertyDetailsPage

export type MainScreenStackNavigationProp = NativeStackNavigationProp<
    NavigationParamsList,
    Routes.Landing
>

// type LoginScreenProps = {
//     redirectSource?: REDIRECT_SOURCE.LOGOUT
//     phone?: string
// }


export type TabParamList = {
    // [Routes.Browse]: {
    //     withTabBar: boolean
    //     redirectSource?: REDIRECT_SOURCE.LOGOUT
    // }
    [Routes.Browse]: undefined
    [Routes.SearchPage]: undefined
    [Routes.Notifications]: undefined
    [Routes.MyLists]: undefined
    [Routes.Menu]: undefined
}


export type NavigationParamsList = {
    [Routes.Landing]: undefined

    // search tab
    [Routes.SearchPage]:
    undefined | {}


    // browser tab
    [Routes.Browse]: undefined

    // notifications tab
    [Routes.Notifications]: undefined

    // my list tab
    [Routes.MyLists]: undefined
    [Routes.MyListsDetails]: undefined

    // menu tab
    [Routes.Menu]: undefined

    //  Browse tab stack 
    [Routes.BrowseConatiner]: undefined | { item: any }
    [Routes.PropertyDetailsPage]: undefined | { mlsNumber: string }

    // Search tab stack
    [Routes.SearchPageContainer]: undefined | {};

    // MyLists tab stack
    [Routes.MyListsContainer]: undefined | {};

    // Notification tab stack
    [Routes.NotificationsConatainer]: undefined | {}

    // Menu tab stack
    [Routes.MenuContainer]: undefined | {}


}


// For tab navigation stack params list
export type BrowseTabNavigationProps = {
    route: RouteProp<TabParamList, Routes.Browse>
    navigation: NativeStackNavigationProp<
        NavigationParamsList,
        BrowseTabRoute
    >
}

export type MyListTabNavigationProps = {
    route: RouteProp<TabParamList, Routes.MyLists>
    navigation: NativeStackNavigationProp<NavigationParamsList, MyListsTabRoute>
}

export type NotificationsTabNavigationProps = {
    route: RouteProp<TabParamList, Routes.Notifications>
    navigation: NativeStackNavigationProp<
        NavigationParamsList,
        Routes.Notifications
    >
}

export type SearchPageTabNavigationProps = {
    route: RouteProp<TabParamList, Routes.SearchPage>
    navigation: NativeStackNavigationProp<
        NavigationParamsList,
        Routes.SearchPage
    >
}

export type MenuTabNavigationProps = {
    route: RouteProp<TabParamList, Routes.Menu>
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<TabParamList, Routes.Menu>,
        NativeStackNavigationProp<NavigationParamsList, Routes.Menu>
    >
}

// nav props params 
export type BrowseConatinerNavProps = {
    route: RouteProp<NavigationParamsList, Routes.BrowseConatiner>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.BrowseConatiner>
}

export type SearchPageNavProps = {
    route: RouteProp<NavigationParamsList, Routes.SearchPageContainer>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.SearchPage>
}

export type NotificationsNavProps = {
    route: RouteProp<NavigationParamsList, Routes.NotificationsConatainer>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.Browse>
}

export type MyListsNavProps = {
    route: RouteProp<NavigationParamsList, Routes.MyListsContainer>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.MyLists>
}

export type MenuNavProps = {
    route: RouteProp<NavigationParamsList, Routes.MenuContainer>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.Browse>
}

export type PropertyDetailsPageNavProps = {
    route: RouteProp<NavigationParamsList, Routes.PropertyDetailsPage>
    navigation: NativeStackNavigationProp<NavigationParamsList, Routes.PropertyDetailsPage>
}



export enum REDIRECT_SOURCE {
    LOGOUT = 'logout',
}