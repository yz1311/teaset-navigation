
interface NavigationHelperProps {
    //初始化，传递后，可以使用global.NavigationHelper方式直接调用，如不需全局调用，则不需要
    init: (helper,name?:string) => void,
    navigation: any,
    //路由栈
    //类型为 
    /**
     * (Route<string> & {
     *   state?: NavigationState | PartialState<NavigationState>;
     * })[]
     */
    navRouters: any,
    //已过时，用isTopScreenByKey或者isTopScreenByName替代
    isTopScreen: (key:string) => boolean,
    isTopScreenByKey: (key:string) => boolean,
    isTopScreenByName: (routeName:string) => boolean,
    goBack: () => void,
    push: (routeName: string, params?:any) => void,
    navigate: (routeName:string, params?:any) => void,
    resetTo: (routeName:string,params?:any) => void,
    replace: (routeName:string, params?:any) => void,
    popN: (num:number) => void,
    popToTop: () => void,
    popToIndex: (indexOfRoute:number) => void,
    popToRoute: (routeName:string) => void,
  }

  export const NavigationHelper: NavigationHelperProps;