# teaset-navigation
从@yz1311/teaset中拆分出来的导航帮助库

由于react-navigation v5的变更过大，所以单独将该帮助文件拆分出来

## 特色

* 维护几个常用的API，后续不受react-navigation影响
* 自带防止快速点击多次响应的问题
* 全局静态方法调用，不需要高阶组件支持


## 安装

react-navigation v5(@react-navigation/native)以上版本请安装:

```
npm install --save teaset @yz1311/teaset-navigation

```

~~react-navigation v5以下安装0.2.0以下版本:~~(<font color='red'>文档不全，非v5版本请不要使用</font>)

```
npm install --save teaset @yz1311/teaset-navigation@0.1.0
```

react-navigation的安装请参照[跳转](https://reactnavigation.org/docs/getting-started/)


## 理念

react-navigation提供了多个navigator，包括stack、drawer、tab，但是个人建议只使用stack组件，除特殊情况，一般只使用一层stackNavigator，不要
stackNavigator套stackNavigator，stackNavigator中包含的那些方法基本可以满足常见的情况。

tab组件可以使用[react-native-scrollable-tab-view](https://github.com/ptomasroos/react-native-scrollable-tab-view)或者[react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)代替

drawer组件可以使用react-native-gesture-handler的[DrawerLayout](https://software-mansion.github.io/react-native-gesture-handler/docs/component-drawer-layout.html)组件替代

这种方式，灵活度更高

## 用法(react-navigation v5以下暂无文档)

### 1.初始化(非必要操作)

初始化后，可以使用global.NavigationHelper的方式全局调用，而不必每次引用包路径，如果不需要，可以不调用

在入口文件中初始化

```
import {NavigationHelper} from '@yz1311/teaset-navigation';

NavigationHelper.init(NavigationHelper);
```

<font color='red'>注意:</font>

在使用eslint或者typescript的项目中可能会爆红，找不到属性名
> 1.针对eslint，在`.eslintrc.js`文件(或者等同的其他形式的文件)的`globals`节点加入:

```
"globals": {
    ....

    //添加这一行，添加全局对象
    "NavigationHelper": true,
}
```

> 2.针对typescript, 在`global.d.ts`文件(没有可以创建)根节点加入:

下面这些定义可以直接从包中的index.d.ts文件中复制过来

```
declare var NavigationHelper: {
    init: (helper,name?:string) => void,
    navigation: any,
    navRouters: any,
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
};
```

### 2.在Navigator中的全局screenOptions回调用获取navigation对象

每个页面的navigation对象是不一样的，所以NavigationHelper的navigation需要一直刷新

```javascript
<Stack.Navigator
        initialRouteName="AppEntry"
        screenOptions={({navigation}) => {
          //加入该行
          NavigationHelper.navigation = navigation;

          ...

```

### 3.监听路由变化,刷新路由栈对象

```
<NavigationContainer onStateChange={(state: NavigationState) => {
    //加入该行
    //这个是跳转了才去回调，所以不能利用routes来判断路由栈
    NavigationHelper.navRouters = state.routes;
}}>
    <AppNavigator/>
</NavigationContainer>
```


上面步骤好了之后，就可以在全局使用它的所有静态方法了



## 注意事项

### 1.不要在页面刚跳转后使用`navRouters`来进行判断

 navRouters的刷新不是实时的，在新页面的componentDidMount中获取`navRouers`对象，可能此时还不包括该路由



### 2.注意该库是默认开启防止重复点击的

有很多情况下，快速点击多下可能会触发多次跳转页面(在android上面出现比较频繁),该库默认会设置0.8s的延迟，0.8s内只能进行一次跳转操作(报错reset replace操作，不包括goBack)，同时因为这个特性，在需要短时间内多次触发的场景，应该直接调用NavigationHelper.navigation.dispatch方法进行操作

一个常用的场景就是网络请求的全局拦截器，token过期后，需要跳转到登录页面，此时如果刚好在进行其他跳转操作，就会出现无法跳转到登录界面

