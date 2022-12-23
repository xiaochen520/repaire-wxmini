import { createApp } from 'vue'
import './app.scss'
import { AtButton } from 'taro-ui-vue3'
import { createUI } from 'taro-ui-vue3'
import 'taro-ui-vue3/dist/style/components/icon.scss'
import "taro-ui-vue3/dist/style/components/button.scss"

const App = createApp();

const tuv3 = createUI({
  AtButton
});

App.use(tuv3)

export default App
