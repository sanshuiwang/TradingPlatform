#路由
路由进行了按需加载，不同部分路由页代码分离，history的成功引用。
组件中无需引用history.js,直接this.props.history.push('.....')
import history from './history';
action中引用文件后history.push('。。。。');

#redux
react-redux
redux-thunk作为中间件

本master分支没有middleware处理异步函数
以及没有call - api的一个整合以及约定

————在不涉及中间件的情况下，在master进行配置更改优化后合并入带有中间件的分支
- master 向其他带有中间件的分支合并
-（待优化）按需加载bundle,react-router-dom官方已出新方案

v1/basics 整合无异步处理（中间件）的分支，在此分支每次基础性改完后，在其他带有中间件的分支下拉此分支。
