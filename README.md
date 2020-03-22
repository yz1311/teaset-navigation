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

react-navigation v5以下安装0.2.0以下版本:

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

## 用法
