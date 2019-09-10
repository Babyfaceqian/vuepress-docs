# Nginx配置web服务
## 配置
粗暴修改/etc/nginx/nginx.conf。
```vim

user root;
######################################
upstream nodeserver1 {
    	server localhost:8001;	
    }
    server {
       # listen       3000 default_server;
       # listen       [::]:3000 default_server;
	listen 80;
        ##server_name  www.mikeandlyle.top;
        server_name 39.108.158.235;
	#root         /usr/share/nginx/html;
	root		/home/travis/web/zhangqiantech/dist;
	index	index.html;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        #location / {
	#    proxy_pass   http://nodeserver1;
        #}
	location / {
        	try_files $uri $uri/ /index.html;    
    	}
	location ^~ /api/ {
		proxy_pass http://nodeserver1;
	}
        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }

```
解释一下配置。
```vim
user root;
```
设置nginx操作的用户，如果用户没有对一些nginx需要操作的文件的操作权限，那么nginx服务可能会有问题甚至挂掉。
```vim
upstream nodeserver1 {
    	server localhost:8001;	
    }
    
location ^~ /api/ {
		proxy_pass http://nodeserver1;
	}
```
这里在调用路由前缀为`/api/`时，将后端服务指向`localhost:8001`。
```vim
listen 80;
    server_name 39.108.158.235;
	root		/home/travis/web/zhangqiantech/dist;
	index	index.html;
```
这里设置监听端口、静态目录和文件，当访问 `30.108.158.235`的根目录时，返回`index.html`。
```vim
location / {
        	try_files $uri $uri/ /index.html;    
    	}
```
这里的设置主要是针对前端采用`browserRouter`（html5 router），访问任何路由都会返回`index.html`，如果不设置，刷新页面会报404 not found。

## 常用命令
```vim
sudo nginx #打开 nginx
nginx -s reload|reopen|stop|quit  #重新加载配置|重启|停止|退出 nginx
nginx -t   #测试配置是否有语法错误
```