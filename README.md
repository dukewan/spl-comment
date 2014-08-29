#spl-comment

a simple comment plugin based on jQuery 

## 截屏效果

+ 初始状态

![组件初始状态](http://img3.picbed.org/uploads/2014/08/empty.png) 

+ 有评论的状态

![组件有评论的状态](http://img4.tuchuang.org/uploads/2014/08/comment.png)

## 使用

### 引入 css、js 文件

```
spl-comment.css

spl-comment.js
```

### html 结构

在 html 中添加如下代码

```
<div class="spl-comment">
    <div class="spl-reply">
        <input type="text" class="spl-area" placeholder="说点什么吧~" />
        <div class="spl-submit">发布</div>
    </div>
    <div class="spl-list">
    </div>
</div>
```
### js 逻辑绑定

```
$(function() {
    $('.spl-comment').splComment({
        user: 'dukewan',  // 评论的用户名，设置过之后才能评论
        url: './data.php' // 接收评论的url
    });
});
```

### 前后端接口

+ 当用户进行评论时，前端会向后端 post 以下数据

```
user: xxx       // 评论的用户名
content: xxx    // 评论的内容
```

+ 后端根据处理结果返回给前端相应的 json

```
// success
{
    "state": "success",          // 状态
    "msg": "发布成功",            // 提示信息
    "comment": {                // 经过处理的用户评论，再次返回给前端
        "user": "匿名",
        "time": "刚刚",
        "content": "你说我说点什么好呢？哇咔咔"
    }
}

// error
{
    "state": "error",
    "msg": "发布失败"
}
```


