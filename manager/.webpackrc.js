import { resolve } from "path";

export default {
	  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  alias:{
    '@':resolve('src')
  }
}
