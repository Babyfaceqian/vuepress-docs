# Travis自动构建部署服务搭建
## 准备工作
1. 待部署的github仓库
2. 一台云服务器，这里以阿里云的centOS服务器为例
3. ssh或putty等可以登录到云服务器的工具

## 启用travis
>
> 1. Go to Travis-ci.com and Sign up with GitHub.

登录travis官网，用github账号登录。
> 2. Accept the Authorization of Travis CI. You’ll be redirected to GitHub.

接受Travis CI验证，会跳转到你的github。
> 3. Click the green Activate button, and select the repositories you want to use with Travis CI.

点击启用travis按钮，选择需要用travis构建的仓库。
> 4. Add a `.travis.yml` file to your repository to tell Travis CI what to do.

添加`.travis.yml`到你的仓库根目录，travis会读取这个文件作为配置内容。
> 5. Add the `.travis.yml` file to git, commit and push, to trigger a Travis CI build:

提交`.travis.yml`会触发travis构建。
Travis only runs builds on the commits you push after you’ve added a .travis.yml file.
> 6. Check the build status page to see if your build passes or fails, according to the return status of the build command by visiting the Travis CI and selecting your repository.

选择对应的仓库，查看构建状态成功还是失败。


参考上面官网的步骤，我们会在仓库根目录下添加`.travis.yml`文件。
.travis.yml
```yml
language: node_js
node_js:
- '8'
```
因为我们部署的是node项目，所以语言选择 `node_js`，版本选择比较高的 `8`。详细的配置可参考[官网](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)。
构建好之后在travis上就可以看到项目passed。如图所示。
![fac39adc6cfc4a850a19f1be66607591.png](evernotecid://5CEB42F5-35BD-4DEF-B080-D633405A01FA/appyinxiangcom/2715342/ENResource/p19)

## 构建打包
travis上的项目构建其实是跑在travis提供的一台虚拟服务器上，在job log我们可以清楚的看到构建用的虚拟服务器信息。
![b6c31532d9d53319048042b2412d28df.png](evernotecid://5CEB42F5-35BD-4DEF-B080-D633405A01FA/appyinxiangcom/2715342/ENResource/p20)
这台虚拟的服务器可以做很多事情，比如构建、测试，也可以在上面执行自定义的linux命令或脚本。当然，部署服务器还是需要用自己的。我们的目的是使用travis虚拟服务器进行构建打包（暂时不考虑测试），将打包好的文件用scp传到部署服务器，再执行一些脚本启动服务。

修改`.travis.yml`如下
```yml
language: node_js
node_js:
- '8'
install:
- npm install
script:
- npm run build
before_install:
after_success:
- scp -r dist/ travis@39.108.158.235:/home/travis/web/zhangqiantech
- ssh travis@39.108.158.235 -o StrictHostKeyChecking=no "/home/travis/web/zhangqiantech/run.sh"

```
这里travis虚拟服务器会帮我们处理`install`和`script`命令，打包后的目录是`dist`，在构建成功后用`scp`命令将打包后的文件放到部署服务器上。然后登陆到部署服务器执行启动服务的命令。
由于需要让虚拟服务器能够自动登录到部署服务器执行命令，需要关联服务器。

## 关联服务器
用ssh或putty登录到部署服务器，安装travis。
```vim
$ gem install travis
```
创建并切换到travis用户，后面会用此用户名登陆服务器。
```vim
$ useradd travis
$ su travis
```
拉取仓库到服务器。
```vim
$ git clone git@github.com:Babyfaceqian/zhangqiantech.git
```
登陆travis。
```vim
$ travis login
```
cd到仓库根目录，执行下面的语句，作用是将用于免密登陆的id_rsa也就是私钥加密保存到仓库里面，travis虚拟服务器尝试登陆的时候会通过该私钥登陆到部署服务器。
```vim
$ travis encrypt-file ~/.ssh/id_rsa --add
Detected repository as xxx/xxx, is this correct? |yes| yes
encrypting ~/.ssh/id_rsa for xxx/xxx
storing result as id_rsa.enc
storing secure env variables for decryption

Make sure to add id_rsa.enc to the git repository.
Make sure not to add ~/.ssh/id_rsa to the git repository.
Commit all changes to your .travis.yml.
```
执行完后 `.travis.yml` 的 `before-install` 下会增加一行内容。
```yml
before_install:
  - openssl aes-256-cbc -K $encrypted_d89376f3278d_key -iv $encrypted_d89376f3278d_iv
  -in id_rsa.enc -out ~\/.ssh/id_rsa -d
```
复制id_rsa.pub到同目录authorized_keys。
这里要注意的一点是，如果是linux服务器，需要将以上id_rsa的路径修改为`~/.ssh/id_rsa`，不然后面找不到这个文件。
为了保证权限正常，还需要添加一行内容。
```yml
- chmod 600 ~/.ssh/id_rsa
```
第一次登陆服务器的时候可能会出现ssh主机验证，可以通过添加 `addons` 配置解决。
```yml
addons:
  ssh_known_hosts: 39.108.158.235
```
保存 `.travis.yml` 并提交代码。现在travis可以自动免密登陆到部署服务器上执行命令了。