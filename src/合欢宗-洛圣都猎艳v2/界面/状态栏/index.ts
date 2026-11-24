import App from './App.vue';
import './global.css';

$(async () => {
  try {
    await waitGlobalInitialized('Mvu');
    const app = createApp(App);
    app.config.errorHandler = error => {
      console.error('[合欢宗-洛圣都猎艳 v2 状态栏] 渲染失败', error);
      $('#app').html(
        '<div style="padding:12px 14px;color:#ff9ec2;font:13px/1.6 system-ui,sans-serif;">' +
          '状态栏渲染失败（多半是变量结构异常）：' +
          String(error instanceof Error ? error.message : error) +
          '</div>',
      );
    };
    app.use(createPinia()).mount('#app');
  } catch (error) {
    console.error('[合欢宗-洛圣都猎艳 v2 状态栏] 初始化失败', error);
    $('#app').html(
      '<div style="padding:12px 14px;color:#ff9ec2;font:13px/1.6 system-ui,sans-serif;">' +
        '状态栏初始化失败：请确认已启用 MVU 脚本（MagVarUpdate）。' +
        '</div>',
    );
  }
});
