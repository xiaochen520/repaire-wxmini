import { createApp } from 'vue'
import './app.scss'
import { AtButton, createUI } from 'taro-ui-vue3'
import 'taro-ui-vue3/dist/style/components/icon.scss'
import "taro-ui-vue3/dist/style/components/button.scss"

import { Button, DatePicker, Picker, Popup, Divider, OverLay, Icon } from '@nutui/nutui-taro';

const App = createApp();

const tuv3 = createUI({
  AtButton
});

App.use(tuv3).use(Button).use(DatePicker).use(Picker).use(Popup).use(Divider).use(OverLay).use(Icon)

export default App
