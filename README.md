### 安装依赖
``` yarn install ```

### 修改节点配置

- 修改 ```src/account.js``` 文件中的 ```config``` 改成自己所需要的：
```
// Default configuration
config = {
    chainId: "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840", // chainId，组装签名时需要，此处填写的是 Jungle 测试网的 chainId，chainId 可以通过 getInfo RPC 接口查询到
    httpEndpoint: 'https://jungle3.cryptolions.io:443',
}
```

### 创建一个多签账户

- 修改 ```main``` 函数中调用 ```newAccount``` 方法的参数
    - accountName 要创建的账号名
    - owner 新账号的 owner 权限组
    - active 新账号的 active 权限组
    - keys 交易发送者的私钥
    - actor 交易发送方账户名
    - permission 交易发送方使用的权限组（eg：avtive）

> note：EOS 创建账户之后还需要 ```buyrambytes``` 和 ```delegatebw``` 两步交易来购买 RAM 和抵押带宽

- 执行 ```yarn create_account```


### 执行转账交易

- 修改 ```src/index.js``` 文件中的 ```config```
- 修改 ```main``` 函数中调用 ```transfer``` 的参数改成自己想要的
> main 中执行了两次 transfer，第一次是单签向多签账户转账，第二次是多签向单签账户转账，构造时候可以参考现有示例
    - from 转账发起方
    - to 转账接收方
    - amount 转账金额
    - memo 转账附加信息
    - keys 交易发送者的私钥
    - authorization 交易发送者授权，格式为 name@permission（eg：spongebob111@active）
