import { createApp } from 'vue'
import './app.scss'
import { AtButton, createUI } from 'taro-ui-vue3'
import { Popup } from "@nutui/nutui"
import 'taro-ui-vue3/dist/style/components/icon.scss'
import "taro-ui-vue3/dist/style/components/button.scss"

const App = createApp();

const tuv3 = createUI({
  AtButton
});

App.use(tuv3).use(Popup)

export default App
