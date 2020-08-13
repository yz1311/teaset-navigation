import {CommonActions, StackActions} from "@react-navigation/native";
import {Route, NavigationState, PartialState} from '@react-navigation/routers'

var NAVIGATION_HELPER_BLOBAL_NAME = `NavigationHelper`;

  export default class navigationHelper {
    static init =  function (helper,name = NAVIGATION_HELPER_BLOBAL_NAME) {
      NAVIGATION_HELPER_BLOBAL_NAME = name;
      global[NAVIGATION_HELPER_BLOBAL_NAME] = helper;
    }
 
    static navigation: any;

    static navRouters: (Route<string> & {
      state?: NavigationState | PartialState<NavigationState>;
  })[] = [];

    static CANTOUCH = true;

    //延迟的时间
    static delay = 0.8;

    static canTouch() {
      if(this.CANTOUCH) {
        this.CANTOUCH = false;
        setTimeout(() => {
          this.CANTOUCH = true;
        }, this.delay*1000);
        return true;
      }
      return false;
    }

    /**
     * 由于虽然可以使用redux获取到routes属性进行判断
     * 但是会引起界面的刷新，目前使用全局变量来解决
     * @param key ,可以通过navigation.state.key获取
     * @returns {boolean}
     */
    //当前是不是最顶层的页面
    static isTopScreen(key: string) {
      console.warn(
        'NavigationHelper.isTopScreen is deprecated, call NavigationHelper.isTopScreenByKey instead',
      );
      return key === this.navRouters[this.navRouters.length - 1].key;
    }

    static isTopScreenByKey(key: string) {
      return key === this.navRouters[this.navRouters.length - 1].key;
    }

    static isTopScreenByName(routeName: string) {
      return routeName === this.navRouters[this.navRouters.length - 1].name;
    }

    static goBack() {
      const backAction = CommonActions.goBack();
      this.navigation.dispatch(backAction);
    }

    static navigate(routeName: string, params) {
      if(!this.canTouch()) {
        return;
      }
      const navigateAction = CommonActions.navigate(
        routeName,
        params
      );
      this.navigation.dispatch(navigateAction);
    }

    /**
     * 跟navigate一样，区别是一直会将新的页面入栈，navigate如果栈中存在相同页面，会返回到已存在的页面
     * @param routeName
     * @param params
     */
    static push(routeName: string, params) {
      if(!this.canTouch()) {
        return;
      }
      const pushAction = StackActions.push(
        routeName,
        params
      );
      this.navigation.dispatch(pushAction);
    }

    static replace(routeName: string, params) {
      if(!this.canTouch()) {
        return;
      }
      const navigateAction = StackActions.replace(
        routeName,
        params
      );
      this.navigation.dispatch(navigateAction);
    }

    static popN(num: number) {
      if(!this.canTouch()) {
        return;
      }
      if (this.navRouters.length - num < 1) {
        console.info("无法后退了");
        return;
      }
      const backAction = StackActions.pop(num);
      this.navigation.dispatch(backAction);
    }

    static resetTo(
      routeName: string,
      params = {} //已测试参数可以传递
    ) {
      if(!this.canTouch()) {
        return;
      }
      let resetAction = CommonActions.reset({
        index: 0,
        routes: [
          {name: routeName, params: params}
        ]
      });
      this.navigation.dispatch(resetAction);
    }

    static popToTop() {
      if(!this.canTouch()) {
        return;
      }
      var numToPop = this.navRouters.length - 1;
      this.popN(numToPop);
    }

    static popToIndex(indexOfRoute: number) {
      if(!this.canTouch()) {
        return;
      }
      var numToPop = this.navRouters.length - 1 - indexOfRoute;
      this.popN(numToPop);
    }

    static popToRoute(routeName: string) {
      if(!this.canTouch()) {
        return;
      }
      let index = this.navRouters.map(x => x.name).indexOf(routeName);
      if (index >= 0) {
        const backAction = StackActions.pop(this.navRouters.length - index - 1);
        this.navigation.dispatch(backAction);
      } else {
        console.info("找不到路由");
      }
    }
  }
