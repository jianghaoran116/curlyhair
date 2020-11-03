module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "plugins": [
        "react"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    settings: {
        'import/resolver': {
          node: {
            paths: ['src/index'],
          },
          webpack: {
            config: {
              resolve,
            },
          },
        },
      },
    
    "rules": {
        "react/jsx-uses-react": 1, // 防止反应被错误地标记为未使用
        "react/jsx-uses-vars": 2, // 防止在JSX中使用的变量被错误地标记为未使用
        // "import/no-unresolved": 0, // 取消自动解析路径，以此开启alias的别名路径设置
    }
};