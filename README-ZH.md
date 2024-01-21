<h1>YCSB-SE</h1>

**适用于无服务器计算工作流的基准测试工具。**

<p align="center">
  <a href="#overview">总览</a> • <a href="#documentation">文档</a>
  • <a href="./README.md" target="_blank">English</a>
<br>
</p>

<div id="overview"></div>

## 总览

**Ycsb-se** 是适用于无服务器计算工作流的基准工具。它基于 [YCSB](https://github.com/brianfrankcooper/YCSB)，这是一种流行的云数据库基准测试工具。

项目整体使用 Node.js 编写，以便于在不同的云平台上部署。

Ycsb-se 旨在评估无服务器计算工作流的性能，这些工作流由多个功能组成。Ycsb-se 可用于评估无服务器计算工作流在延迟、吞吐量和成本方面的性能。

<div id="documentation"></div>

## Documentation

注意：文档仍在建设中。
项目目前已支持的云函数有：

- [ ] [AWS Lambda](https://aws.amazon.com/lambda/)
- [ ] [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [x] [alibaba Cloud Function Compute](https://www.alibabacloud.com/product/function-compute)

项目目前已支持的数据库有：

- [x] [MongoDB](https://www.mongodb.com/)
- [x] [Redis](https://redis.io/)
- [x] [Cassandra](https://cassandra.apache.org/)

### 调用方法

```json
{
  "dbType": "mongodb",
  "workloadType": "A"
}
```

### 返回结果

```json
{
  "coldStartDuration": "N/A",
  "dbConnectionTime": "63ms",
  "totalFunctionExecutionTime": "339ms",
  "performanceReport": {
    "totalTime": 264,
    "totalOperations": 100,
    "successfulOperations": 50,
    "failedOperations": 50,
    "averageDuration": 2.44,
    "throughput": 189.39393939393938
  }
}
```

> 冷启动性能数据不便监测，因此返回 N/A。可结合云平台监控数据进行分析。

<!-- 准备配置：同地域的数据库，配置云函数，设置环境变量。依赖拉取 -->

# TODO

- [x] 添加数据库清理功能
- [x] 添加数据库初始化功能
- [ ] 更细粒度的性能数据
