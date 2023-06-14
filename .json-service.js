module.exports = () => {
  const url = "src/demo.json";
  const port = 3110;
  return {
    url,
    port,
    service: {
      // 登录
      '/login': {
        methods: 'get',
        handle: ({ json, params, res, req }) => {
          const { query } = req;
          const { user } = json;
          const { name, password } = query;
          if (user[name].password === password) {
            return res.json(200, { message: '通过!' })
          };

          return res.json(403, { message: `name: ${name} is not defined~!` })
          
        }
      },

      // 获取页面列表
      '/get/page/all': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      // 获取组件列表
      '/get/component/all': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      // 获取场景列表
      '/get/scene/all': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },

      // 编辑
      '/set/page': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/set/component': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/set/scene': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },

      // 新增
      '/add/page': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/add/component': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/add/scene': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },

      // 删除
      '/remove/page': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/remove/component': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },
      '/remove/scene': {
        methods: 'post',
        handle: ({ json, params }) => {}
      },


    }
  }
};