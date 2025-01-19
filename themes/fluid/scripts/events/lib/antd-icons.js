'use strict';

hexo.extend.injector.register('head_end', `
<script src="https://unpkg.com/@ant-design/icons@4.7.0/dist/index.umd.js"></script>
<script>
  window.antdIcons = window['@ant-design/icons']
</script>
`, 'default')
