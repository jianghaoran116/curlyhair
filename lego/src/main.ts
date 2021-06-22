import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './routes/index'
import store from './store/index'
import 'ant-design-vue/dist/antd.css'
import * as Icons from "@ant-design/icons-vue"

const icons: any = Icons

const app = createApp(App)
app.use(Antd).use(router).use(store)
app.mount('#app')
for (const i in icons) {
    app.component(i, icons[i])
}
