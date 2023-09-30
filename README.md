# 管道铺设系统（最小生成树）

#### 运行方法

/src/main/webapp/MyMap.html

**需要将百度地图access key修改为自己的access key，请到百度地图申请**

建议使用 idea 配置 tomcat 9 后运行，直接用浏览器打开不能完整显示所有图片。

建议使用firefox打开，其他浏览器打开可能会出现排版错乱的情况，你可以自己修改一下网页排版。



因为项目要求实现文件下载的功能，所以我们的项目是在选择最小生成树的所有点之后，首先点击保存文件，然后再将文件加载进来，之后点击生成最小生成树即可自动演示生成过程。点击下一步也可以一步一步的演示。