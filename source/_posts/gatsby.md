---
layout: post
title: Gatsby入门test
subtitle: Gatsby入门以及简单的博客搭建
date: 2021-01-22
author: "toshiba"
index_img: https://yt-card-system.oss-cn-beijing.aliyuncs.com/blog/index_img/gatsby.png
comments: true

tags:
  - blog
  - Gatsby
categories:
  - Gatsby

sticky: 0
---

# Gatsby

[Gatsby](https://www.gatsbyjs.com/)是 React 的开源框架用于创建网站和应用程序。 无论用来构建个人博客或者公司主页都是一个不错的选择，本文做一个简单的功能介绍和入门。

## 环境准备

首先，以 Mac 为例 首先安装 [`brew`](https://brew.sh/)

```bash
# 安装Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew -v

# 安装命令行工具
xcode-select --install

# 安装Nodejs
brew install node

# 安装git
brew install git
```

安装**`gatsby-cli`**

```bash
npm install -g gatsby-cli

# 安装成功可以看到可用命令
gatsby --help

# 我们可以快速生成一个站点

gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]

gatsby new hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world

cd hello-world

gatsby develop

# 访问 http://localhost:8000/ 就可以看到
```

目录如下

![%E5%B0%86%E5%AE%98%E7%BD%91%E6%96%87%E6%A1%A3%E6%95%B4%E7%90%86%E4%B8%80%E4%B8%8B%2033f5f91bda404798bda15f55e9f1bf96/directory.png](%E5%B0%86%E5%AE%98%E7%BD%91%E6%96%87%E6%A1%A3%E6%95%B4%E7%90%86%E4%B8%80%E4%B8%8B%2033f5f91bda404798bda15f55e9f1bf96/directory.png)

`src/pages/index.js` 即是首页地址，按照约定 `src/pages` 下面所有的文件都是一个页面

```jsx
import React from "react";

export default function Home() {
  return (
    <div style={{ color: `purple` }}>
      <h1>Hello Gatsby!</h1>
      <p>What a world.</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  );
}
```

我们新加一个页面 `src/pages/about.js`

```jsx
import React from "react";

export default function About() {
  return (
    <div style={{ color: `teal` }}>
      <h1>About Gatsby</h1>
      <p>Such wow. Very React.</p>
    </div>
  );
}
```

这样我们就有了两个页面分别是通过访问 [http://localhost:8000](http://localhost:8000) 和 [https://localhost:8000/about](https://localhost:8000/about) 访问。 到这里就可以愉快的添加页面了。

### 使用组件

在上面的页面中假设我们页面有公共的`header` 或 `footer`，我们不需要在每个页面中定义，这时候就需要用到组件，同样的 Gatsby 约定 `src/components` 文件夹下的都是放的组件，我们新建一个`src/components/header.js`的组件

```jsx
import React from "react";
export default function Header(props) {
  return <h1>{props.headerText}</h1>;
}
```

在 about 页面中使用

```jsx
import React from "react";
import Header from "../components/header";
export default function About() {
  return (
    <div style={{ color: `teal` }}>
      <Header headerText="About Gatsby" />
      <p>Such wow. Very React.</p>
    </div>
  );
}
```

到了这里页面已经大概出来了，我也通过 `[surge.sh](https://surge.sh/)` 部署了一下

```bash
npm install --global surge

# Then create a (free) account with them
surge login
# 提示输入邮箱密码

gatsby build

ls public

surge public/
```

通过访问

[https://arrogant-station.surge.sh/](https://arrogant-station.surge.sh/)

[https://arrogant-station.surge.sh/about/](https://arrogant-station.surge.sh/about/)

就可以看到刚刚的效果

### 自定义样式表

当我们想自定义样式时，我们可以在 src 下的 styles 下建立 global.css，如下：

```
├── package.json
├── src
│   └── pages
│       └── index.js
│   └── styles
│       └── global.css
```

```css
/ * src/styles/global.css */
htm {
  background-color: lavenderblush;
}
```

如果想让该文件生效，需要在项目根目录下新建一个 `gatsby-browser.js`

```jsx
import "./src/styles/global.css";

// or:
// require('./src/styles/global.css')
```

### 创建组件级作用域的样式

我们创建一个 `Container` 组件

```jsx
├── package.json
├── src
│   └── components
│       └── container.js
│       └── container.module.css

```

我们以 `.module.css` 作为后缀即可创建一个组件级别作用域样式

```jsx
import React from "react";
import containerStyles from "./container.module.css";

export default function Container({ children }) {
  return <div className={containerStyles.container}>{children}</div>;
}
```

```css
.container {
  margin: 3rem auto;
  max-width: 600px;
}
```

新建一个页面用来使用这个组件 `src/pages/about-css-modules.js`

```jsx
import React from "react";

import Container from "../components/container";

export default function About() {
  return (
    <Container>
      <h1>About Css Modules</h1>
      <p>CSS Module are cool</p>
    </Container>
  );
}
```

### 使用插件和布局组件

Gatsby 有着丰富的组件库 `[Plugin Library](https://www.gatsbyjs.com/plugins)` ,我们使用组件的一个初衷就是让构建站点或博客变得简单。我们将通过使用 `[gatsby-plugin-typography](https://www.gatsbyjs.com/plugins/gatsby-plugin-typography/)` 来了解如何使用插件

> `[Typography.js](https://kyleamathews.github.io/typography.js/)` is a JavaScript library which generates global base styles for your site’s typography. The library has a corresponding Gatsby plugin to streamline using it in a Gatsby site.

首先我们安装这个插件以及相关依赖

```bash
npm install gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```

修改 `gatsby-config.js` 如下 ，关于该文件的详细配置在**`[这里](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/)` 。**

```jsx
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
```

Typography.js 需要一个配置文件放到 `src/utils/typography.js`

```jsx
import Typography from "typography";
import fairyGateTheme from "typography-theme-fairy-gates";

const typography = new Typography(fairyGateTheme);

export const { scale, rhythm, options } = typography;
export default typography;
```

这样就可以愉快的使用选中的主题来作为网站的基本样式了。接下来自定义`Layout` 组件，`src/components/layout.js`

```jsx
// src/components/layout.js
import React from "react"

export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
  )
}

//改进版本

import React from "react"
import { Link } from "gatsby"
const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <header style={{ marginBottom: `1.5rem` }}>
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <h3 style={{ display: `inline` }}>MySweetSite</h3>
        </Link>
        <ul style={{ listStyle: `none`, cssFloat: `right` }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
```

```jsx
// src/pages/index.js
import React from "react";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
      <p>
        What do I like to do? Lots of course but definitely enjoy building
        websites.
      </p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
  );
}
```

到了这里我们已经有了一个大概的博客模型，效果可以在这里看到 [https://wretched-weight.surge.sh](https://wretched-weight.surge.sh/)

不过在这个过程中碰到一个`css` 被 强制转成 `cssFloat` 的问题 issue 地址在这里 [https://github.com/stylelint/stylelint/issues/4490](https://github.com/stylelint/stylelint/issues/4490)

### 使用数据 Graphql

我们新建一个项目

```bash
gatsby new gatsby-lesson-two https://github.com/gatsbyjs/gatsby-starter-hello-world
```

然后安装插件以及新的主题

```bash
npm install gatsby-plugin-typography typography react-typography typography-theme-kirkham gatsby-plugin-emotion @emotion/react
```

大部分代码跟之前类似，直接上代码，我会在最后把代码地址贴上来

```jsx
// src/components/layout.js

import React from "react";
import { css } from "@emotion/react";
import { Link } from "gatsby";

import { rhythm } from "../utils/typography";

export default function Layout({ children }) {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          Pandas Eating Lots
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
      {children}
    </div>
  );
}
```

```jsx
// src/pages/index.js
import React from "react";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Amazing Pandas Eating Things</h1>
      <div>
        <img
          src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
          alt="Group of pandas eating bamboo"
        />
      </div>
    </Layout>
  );
}
```

```jsx
// about.js

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function About({ data }) {
  return (
    <Layout>
      <h1>About {data.site.siteMetadata.title}</h1>
      <p>
        We're the only site running on your computer dedicated to showing the
        best photos and videos of pandas eating lots of food.
      </p>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
```

```jsx
// src/utils/typography.js

import Typography from "typography";
import kirkhamTheme from "typography-theme-kirkham";

const typography = new Typography(kirkhamTheme);

export default typography;
export const rhythm = typography.rhythm;
```

```jsx
// gatsby-config.js

module.exports = {
  siteMetadata: {
    title: `Title from siteMetadata`,
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
};
```

最终结果如下 [https://clumsy-texture.surge.sh/](https://clumsy-texture.surge.sh/)

![https://www.gatsbyjs.com/static/9a136a7536d2f4b315d446f6a1a83725/321ea/start.png](https://www.gatsbyjs.com/static/9a136a7536d2f4b315d446f6a1a83725/321ea/start.png)

在 `about` 页面中我们通过 graphql 来查询到了 siteMetadata 中的数据并进行了渲染，接下来我们将继续学习使用 `StaticQuery` ，它允许我们在非页面组件中（比如 `layout.js`）来查询数据,我们修改 layout.js

```jsx
// src/components/layout.js

import React from "react";
import { css } from "@emotion/react";
import { useStaticQuery, Link, graphql } from "gatsby";

import { rhythm } from "../utils/typography";
export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <Link to={`/`}>
        <h3
          css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <Link
        to={`/about/`}
        css={css`
          float: right;
        `}
      >
        About
      </Link>
      {children}
    </div>
  );
}
```

到目前为止已经可以通过 graphql 来获取数据无论是页面还是组件中都可以愉快的工作了。

### 插件

安装 [gatsby-source-filesystem](https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/)

```bash
npm install gatsby-source-filesystem
```

然后在`gatsby-config.js`中增加一段新的配置

```bash
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

我们可以在调试请求的页面中 [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql) 看到结果

```bash
query MyQuery {
  allFile(sort: {fields: sourceInstanceName, order: ASC}) {
    edges {
      node {
        id
        base
        accessTime
      }
    }
  }
}
```

```json
{
  "data": {
    "allFile": {
      "edges": [
        {
          "node": {
            "id": "4adb1b72-3a75-57ee-87d7-a61196fe33a9",
            "base": "typography.js",
            "accessTime": "2021-01-21T09:40:46.525Z"
          }
        },
        {
          "node": {
            "id": "2ac5932a-8346-5197-9dd4-cd96775203f8",
            "base": "about.js",
            "accessTime": "2021-01-21T09:40:46.525Z"
          }
        },
        {
          "node": {
            "id": "e4f28a9d-ce43-59ea-9e93-607960b0f563",
            "base": "index.js",
            "accessTime": "2021-01-21T09:40:46.526Z"
          }
        },
        {
          "node": {
            "id": "ecdff8d0-0225-5f40-966d-84b66a4c3a56",
            "base": "layout.js",
            "accessTime": "2021-01-21T09:40:46.527Z"
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

接下来我们新建一个页面

```jsx
// /src/pages/my-files.js

import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function MyFiles({ data }) {
  console.log(data);
  return (
    <Layout>
      <div>Hello world</div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
```

通过访问 [http://localhost:8000/my-files](http://localhost:8000/my-files) 即可看到我们请求到的数据详情

### 转换插件

通常来说我们的博客数据都存储在一个 Markdown 文件中 `src/pages/sweet-pandas-eating-sweets.md`

```markdown
---
title: "Sweet Pandas Eating Sweets"
date: "2017-08-10"
---

Pandas are really sweet.

Here's a video of a panda eating sweets.

<iframe width="560" height="315" src="https://www.youtube.com/embed/4n0xNbfJLR8" frameborder="0" allowfullscreen></iframe>
```

我们如果我们想让该文件正常显示需要将其转换成我们需要的样子

```bash
npm install gatsby-transformer-remark
```

gatsby-config.js 中增加一个新的配置

```bash
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```

这样我们查询接口的位置会显示两个新的选项 `allMarkdownRemark` 和 `markdownRemark` 通过查询我们可以看到结果如下

```graphql
query MyQuery {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          date
          title
        }
        excerpt
        html
        timeToRead
      }
    }
  }
}
```

```json
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "id": "7cbc5c7a-e49e-5c45-a47e-3dd49a55d64f",
            "frontmatter": {
              "date": "2017-08-10",
              "title": "Sweet Pandas Eating Sweets"
            },
            "excerpt": "Pandas are really sweet. Here's a video of a panda eating sweets.",
            "html": "<p>Pandas are really sweet.</p>\n<p>Here's a video of a panda eating sweets.</p>\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/4n0xNbfJLR8\" frameborder=\"0\" allowfullscreen></iframe>",
            "timeToRead": 1
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

现在我们利用动态数据来渲染首页 `src/pages/index.js`

```json
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/react"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default function Home({ data }) {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
```

现在的顺序是最新的在底下我们可以通过调整参数来改变文章排列顺序将`allMarkdownRemark` 改成`allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC })`

文章列表已经就绪，接下来显示文章详情，我们来自动创建页面以及其路径，通常如果使用了`CMS` 比如`notion` , `Contentful` , `Netlify CMS` ,会自动提供页面路径或者 `slug` , 但如果我们使用 markdown 文件来生成页面需要使用这两个 `API` ：`onCreateNode` 和 `createPages` ,我们需要在`gatsby-node.js`这个文件中使用

```jsx
const { createFilePath } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
	if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    console.log(`\n`, fileNode.relativePath)
  }

	if (node.internal.type === `MarkdownRemark`) {
		console.log(createFilePath({ node, getNode, basePath: `pages` }))
  }
	*/

  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
```

现在有了一个新的字段

```graphql
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "fields": {
              "slug": "/pandas-and-bananas/"
            }
          }
        },
        {
          "node": {
            "fields": {
              "slug": "/sweet-pandas-eating-sweets/"
            }
          }
        }
      ]
    }
  },
  "extensions": {}
}
```

这样我们就可以根据这个字段来找到对应的文章路径了。

仅仅是这样并不够，因为页面还不存在我们需要将页面生成出来，`src/pages/xxx.js` 下的文件会自动生成页面，但是其他的需要我们调用 `createPages`来生成

```jsx
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

// 这一段的是意思是先走接口将所有的数据拉过来
// 将所有的markdown的文件生成对应的页面
exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  console.log(JSON.stringify(result, null, 4));
};
```

要生成页面还需要一个额外的操作，我们需要建立一个模版文件 `src/templates/blog-post.js` 根据这个文件模版以及数据来生成对应的页面

```jsx
import React from "react";
import Layout from "../components/layout";

export default function BlogPost() {
  return (
    <Layout>
      <div>Hello blog post</div>
    </Layout>
  );
}
```

接下来继续更新 `gatsby-node.js`

```jsx
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });
};
```

随便访问一个不存在的链接 [http://localhost:8000/sdf](http://localhost:8000/sdf) 即可看到能够访问的文章列表，点进去即可看到模版文件的内容，接下来我们更新模版数据让他显示该显示的数据即可

```jsx
// src/templates/blog-post.js
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
```

最后一步更新首页中链接

[https://special-shape.surge.sh/](https://special-shape.surge.sh/)
