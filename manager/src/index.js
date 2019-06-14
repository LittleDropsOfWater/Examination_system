import dva from 'dva';
import './index.css';
import loading from "dva-loading";
import {createLogger} from 'redux-logger';
import {message} from 'antd';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use({
	onAction:createLogger(),
	onError(e) {
    message.error(e.message, /* duration */3);
  }
})
app.use(loading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/user').default);
app.model(require('./models/question').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
