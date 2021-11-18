import { createStore } from 'redux' 
import {reducer} from "../reducers/index" 
//  利用createStore方法创建store容器对象  
const store = createStore(reducer)  
export default store  