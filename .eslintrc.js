module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended" // 解决ESlint和Prettier冲突,以Prettier为准
    ],
    overrides: [
    ],
    parser: "vue-eslint/parser",
    parserOptions: {
        // js的版本
      ecmaVersion: 2020, // 解析器
      parser: "@typescript-eslint/parser", // 模块化方案
      sourceType: "module",
      jsxPragma: "React",
      ecmaFeatures: {
        jsx: true
      }
    },
    // 引用的插件  下载的插件去掉eslint-plugin-前缀引入
  plugins: ["vue", "@typescript-eslint"], // 自定义规则
    // 添加规则
    rules: {
      "vue/require-default-prop": "off",
      "vue/require-explicit-emits": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off", // any
      "no-debugger": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "spaced-comment": ["error", "always"],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto"
        }
      ],
      "no-undefined": 0
    }
}
