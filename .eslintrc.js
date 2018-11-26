module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "plugins": [
        "react",
        "import",
        "jsx-a11y",
        "react-hooks" //react hooks eslint
    ],
    "parser": "babel-eslint",
    "extends": [
        // "eslint:recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "globals": {
        "__webpack_public_path__": true,
        "process": true,
        "__dirname": true
    },
    "rules": {
        //solve `React` gives `no-used-vars` errors
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react-hooks/rules-of-hooks": "error",
        //end 
        "indent": ['error', 4, { 'SwitchCase': 1 }],
        "accessor-pairs": 2,
        // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        "array-bracket-spacing": [2, "never"],
        // 在块级作用域外访问块内定义的变量是否报错提示
        "block-scoped-var": 0,
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0, //可以使用console
        "no-debugger": 0, //可以使用debugger
        "no-alert": 2,  //禁止使用alert
        "no-array-constructor": 0,
        "no-caller": 0,//禁止使用arguments.caller或arguments.callee
        "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
        "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
        "no-delete-var": 2,//不能对var声明的变量使用delete操作符
        "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2,//函数参数不能重复
        "no-empty": 2,//块语句中的内容不能为空
        // "no-extra-parens": 1,//禁止非必要的括号
        "no-extra-semi": 2,//禁止多余的冒号
        "no-implied-eval": 2,//禁止使用隐式eval
        "no-with": 2,//禁用with
        "no-irregular-whitespace": 2,//不能有不规则的空格
        "no-multi-spaces": 1,//不能用多余的空格
        "no-multiple-empty-lines": [1, { "max": 2 }],//空行最多不能超过2行
        "no-new": 0,//禁止在使用new构造一个实例后不赋值
        "no-new-func": 1,//禁止使用new Function
        "no-new-object": 2,//禁止使用new Object()
        "no-new-require": 2,//禁止使用new require
        "no-useless-call": 2,//禁止不必要的call和apply
        "no-use-before-define": ["error", { "functions": false, "classes": true }],//未定义前不能使用
        "padded-blocks": 0,//块语句内行首行尾是否要空行
        "space-before-blocks": [2, "always"],//不以新行开始的块{前面要不要有空格
        "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
        "space-in-parens": [0, "never"],//小括号里面要不要有空格
        "space-infix-ops": 2,//中缀操作符周围要不要有空格
        "no-trailing-spaces": 2,//一行结束后面不要有空格
        "generator-star-spacing": 2,//生成器函数*的前后空格
        "object-curly-spacing": [0, "never"],//大括号内是否允许不必要的空格
        "key-spacing": [2, { "beforeColon": false, "afterColon": true }],
        "semi-spacing": [2, { "before": false, "after": true }],//分号前后空格
        "no-this-before-super": 0,//在调用super()之前不能使用this或super
        "constructor-super": 0,//非派生类不能调用super，派生类必须调用super
    },
    "settings": {
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use,
            // default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "16.6.3", // React version, default to the latest React stable release
            // "flowVersion": "0.53" // Flow version
        },
        "propWrapperFunctions": ["forbidExtraProps"] // The names of any functions used to wrap the
        // propTypes object, e.g. `forbidExtraProps`.
        // If this isn't set, any propTypes wrapped in
        // a function will be skipped.
    }
};